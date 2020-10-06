import Application from 'ember-socket-app/app';
import config from 'ember-socket-app/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
