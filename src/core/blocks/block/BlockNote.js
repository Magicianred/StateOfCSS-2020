import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown/with-html'
import { spacing } from 'core/theme'
import { useI18n } from 'core/i18n/i18nContext'

const BlockNote = ({ block }) => {
    const { translate } = useI18n()

    let blockNote
    if (block.note) {
        blockNote = block.note
    } else {
        // for _others blocks (freeform answers), replace suffix with ".others"
        const id = block.id.replace('_others', '.others')
        blockNote = translate(`${block.pageId}.${id}.note`, {}, null)
    }

    return blockNote ? (
        <Note className="Block__Note">
            <ReactMarkdown source={blockNote} escapeHtml={false} />
        </Note>
    ) : null
}

BlockNote.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.node,
        titleId: PropTypes.string,
        description: PropTypes.node,
        descriptionId: PropTypes.string,
    }).isRequired,
}

BlockNote.defaultProps = {
    showDescription: true,
    isShareable: true,
}

const Note = styled.div`
    background: ${(props) => props.theme.colors.backgroundAlt};
    padding: ${spacing()};
    margin-top: ${spacing(2)};
    font-size: ${props => props.theme.typography.size.small};
    p {
        &:last-child {
            margin: 0;
        }
    }

`

export default memo(BlockNote)
