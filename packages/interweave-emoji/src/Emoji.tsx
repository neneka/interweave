/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable complexity */

import React from 'react';
import PropTypes from 'prop-types';
import { Emoticon, Hexcode, Shortcode, Unicode } from 'emojibase';
import EmojiDataManager from './EmojiDataManager';
import { PathShape, SizeShape, SourceShape } from './shapes';
import { Path, Size, Source } from './types';

export interface EmojiProps {
  emojiLargeSize?: Size;
  emojiPath?: Path;
  emojiSize?: Size;
  emojiSource: Source;
  emoticon?: Emoticon;
  enlargeEmoji?: boolean;
  hexcode?: Hexcode;
  renderUnicode?: boolean;
  shortcode?: Shortcode;
  unicode?: Unicode;
}

export default class Emoji extends React.PureComponent<EmojiProps> {
  static propTypes = {
    emojiLargeSize: SizeShape,
    emojiPath: PathShape,
    emojiSize: SizeShape,
    emojiSource: SourceShape.isRequired,
    emoticon: PropTypes.string,
    enlargeEmoji: PropTypes.bool,
    hexcode: PropTypes.string,
    renderUnicode: PropTypes.bool,
    shortcode: PropTypes.string,
    unicode: PropTypes.string,
  };

  static defaultProps = {
    emojiLargeSize: '3em',
    emojiPath: '{{hexcode}}',
    emojiSize: '1em',
    emoticon: '',
    enlargeEmoji: false,
    hexcode: '',
    renderUnicode: false,
    shortcode: '',
    unicode: '',
  };

  render() {
    const data = EmojiDataManager.getInstance(this.props.emojiSource.locale);
    const {
      emojiLargeSize,
      emojiPath,
      emojiSize,
      emoticon,
      enlargeEmoji,
      renderUnicode,
      shortcode,
      unicode,
    } = this.props as Required<EmojiProps>;
    let { hexcode } = this.props;

    if (process.env.NODE_ENV !== 'production') {
      if (!emoticon && !shortcode && !unicode && !hexcode) {
        throw new Error(
          'Emoji component requires a `unicode` character, `emoticon`, `hexcode`, or a `shortcode`.',
        );
      }
    }

    // Retrieve applicable unicode character
    if (!hexcode && shortcode) {
      hexcode = data.SHORTCODE_TO_HEXCODE[shortcode];
    }

    if (!hexcode && emoticon) {
      hexcode = data.EMOTICON_TO_HEXCODE[emoticon];
    }

    if (!hexcode && unicode) {
      hexcode = data.UNICODE_TO_HEXCODE[unicode];
    }

    // Return the invalid value instead of erroring
    if (!hexcode || !data.EMOJIS[hexcode]) {
      return <span>{unicode || emoticon || shortcode || hexcode}</span>;
    }

    const emoji = data.EMOJIS[hexcode];

    if (renderUnicode) {
      return <span>{emoji.unicode}</span>;
    }

    const styles: { [name: string]: string | Size } = {
      display: 'inline-block',
      verticalAlign: 'middle',
    };

    // Handle large styles
    if (enlargeEmoji && emojiLargeSize) {
      styles.width = emojiLargeSize;
      styles.height = emojiLargeSize;

      // Only apply styles if a size is defined
    } else if (emojiSize) {
      styles.width = emojiSize;
      styles.height = emojiSize;
    }

    // Determine the path
    let path = emojiPath || '{{hexcode}}';

    if (typeof path === 'function') {
      path = path(emoji.hexcode, enlargeEmoji, emojiSize, emojiLargeSize);
    } else {
      path = path.replace('{{hexcode}}', emoji.hexcode);
    }

    // http://git.emojione.com/demos/latest/sprites-png.html
    // http://git.emojione.com/demos/latest/sprites-svg.html
    // https://css-tricks.com/using-svg/
    return (
      <img
        src={path}
        alt={emoji.unicode}
        title={emoji.annotation || ''}
        style={styles}
        aria-label={emoji.annotation || ''}
        data-emoticon={emoji.emoticon || ''}
        data-unicode={emoji.unicode}
        data-hexcode={emoji.hexcode}
        data-shortcodes={emoji.canonical_shortcodes.join(', ')}
      />
    );
  }
}
