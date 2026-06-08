import { register } from '@wordpress/data';
import docStore from './docs';
import settingsStore from './settings';
import messagesStore from './messages';

register( docStore );
register( settingsStore );
register( messagesStore );
