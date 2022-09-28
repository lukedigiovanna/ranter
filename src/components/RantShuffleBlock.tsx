import { BlockContainer } from "../constants/theme"

export const RantShuffleBlock = (props: { onClick: () => void }) => {
    return (
        <BlockContainer onClick={() => {
            props.onClick();
        }}>
            Shuffle
        </BlockContainer>
    )
}