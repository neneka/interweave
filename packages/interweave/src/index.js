/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Interweave from './Interweave';
import Markup from './Markup';
import Filter from './Filter';
import Matcher from './Matcher';
import EmailMatcher from './matchers/EmailMatcher';
import HashtagMatcher from './matchers/HashtagMatcher';
import IpMatcher from './matchers/IpMatcher';
import UrlMatcher from './matchers/UrlMatcher';
import { FilterShape, MatcherShape } from './shapes';

export {
  Markup,
  Matcher,
  MatcherShape,
  EmailMatcher,
  HashtagMatcher,
  IpMatcher,
  UrlMatcher,
  Filter,
  FilterShape,
};

export default Interweave;
