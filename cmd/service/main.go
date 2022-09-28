package main

import (
	"fmt"
	"context"
  
	firebase "firebase.google.com/go"
	// "firebase.google.com/go/auth"
	
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"

	
	"time"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"

	"math/rand"

  )

type post struct {
	ID  string `json:"id"`
	Body string `json:"body"`
	Latitude float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	PostTime int64 `json:"postDate"`
}

func main() {
	ctx := context.Background()
	opt := option.WithCredentialsFile("ranter-7a410-firebase-adminsdk-lwi93-14058ac093.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
	//   nil, fmt.Errorf("error initializing app: %v", err)
		fmt.Println("Error initializing app")	
		return
	}
	client, err := app.Firestore(ctx)
	if err != nil {
		fmt.Println("Error creating firestore instance")
		return
	}

	r := gin.Default()

	r.GET("/api/posts", func(c *gin.Context) {
		// collect all documents from rants collection
		iter := client.Collection("rants").Documents(ctx)
		var posts []post
		for {
			doc, err := iter.Next()
			if err == iterator.Done {
				break
			}
			rawData := doc.Data()
			
			post := post{
				Body: rawData["Body"].(string),
				Latitude: rawData["Latitude"].(float64),
				Longitude: rawData["Longitude"].(float64),
				PostTime: rawData["PostTime"].(int64),
				ID: rawData["ID"].(string),
			}

			posts = append(posts, post)
			fmt.Println(post)
		}
		c.JSON(http.StatusOK, gin.H{
			"posts": posts,
		})
	})

	r.GET("/api/random-post", func(c *gin.Context) {
		// query all keys from firestore database
		iter := client.Collection("rants").Documents(ctx)
		var posts []post
		for {
			doc, err := iter.Next()
			if err == iterator.Done {
				break
			}

			rawData := doc.Data()

			post := post{
				Body: rawData["Body"].(string),
				Latitude: rawData["Latitude"].(float64),
				Longitude: rawData["Longitude"].(float64),
				PostTime: rawData["PostTime"].(int64),
				ID: rawData["ID"].(string),
			}

			posts = append(posts, post)
		}
		i := rand.Intn(len(posts))
		c.JSON(http.StatusOK, gin.H{
			"post": posts[i],
		})
	})

	r.POST("/api/posts", func(c *gin.Context) {
		var json post
		c.Bind(&json)
		
		post := post{
			ID: "2", 
			Body: json.Body, 
			Latitude: json.Latitude, 
			Longitude: json.Longitude, 
			PostTime: time.Now().Unix(),
		}

		client.Collection("rants").Add(ctx, post)

		c.JSON(http.StatusOK, gin.H{
			"posted": post,
		})
	})

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	  }))

	r.Run()

	defer client.Close()

}