import {gql} from "@apollo/client";
import { CoreBlocks } from "@faustwp/blocks";
const { CoreQuote: FaustCoreQuote } = CoreBlocks;

export function CoreQuote(props) {
    return <FaustCoreQuote {...props} />;
}

CoreQuote.displayName = { ...FaustCoreQuote.displayName };
CoreQuote.config = {
    ...FaustCoreQuote.config,
    name: `CustomCoreQuoteFragment`
};
CoreQuote.fragments = {
    key: `CustomCoreQuoteFragment`,
    entry: gql`
    fragment CustomCoreQuoteFragment on CoreQuote {
      attributes {
        textAlign
        anchor
        backgroundColor
        citation
        className
        fontFamily
        fontSize
        gradient
        lock
        style
        textColor
        value
        cssClassName
      }
    }
    `
};