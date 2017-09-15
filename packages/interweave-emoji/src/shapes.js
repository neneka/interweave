/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import PropTypes from 'prop-types';
import { SUPPORTED_LOCALES } from 'emojibase/lib/constants';

export const EmojiShape = PropTypes.shape({
  annotation: PropTypes.string,
  canonical_shortcodes: PropTypes.arrayOf(PropTypes.string),
  emoji: PropTypes.string,
  emoticon: PropTypes.string,
  gender: PropTypes.number,
  group: PropTypes.number,
  hexcode: PropTypes.string,
  name: PropTypes.string,
  order: PropTypes.number,
  primary_shortcode: PropTypes.string,
  shortcodes: PropTypes.arrayOf(PropTypes.string),
  skins: PropTypes.arrayOf(PropTypes.object),
  subgroup: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  tone: PropTypes.number,
  type: PropTypes.number,
  unicode: PropTypes.string,
  version: PropTypes.number,
});

export const EmojiPathShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
]);

export const EmojiSizeShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export const EmojiSourceShape = PropTypes.shape({
  compact: PropTypes.bool.isRequired,
  locale: PropTypes.oneOf(SUPPORTED_LOCALES).isRequired,
  version: PropTypes.string.isRequired,
});
