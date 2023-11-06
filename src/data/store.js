import { register } from '@wordpress/data';
import docStore from './docs';
import settingsStore from './settings';

register( docStore );
register( settingsStore );
