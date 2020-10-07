import Component from '@ember/component';
import { inject as service } from '@ember/service';
import axios from 'axios';
import Pusher from 'pusher-js';

export default Component.extend({
  activeUserService: service('active-user'),
  messages: ['Ember-socket-test'].map((message) => {
    return {
      username: 'Viktor Skubchenko',
      time: new Date(),
      text: message,
    };
  }),
  init() {
    this._super(...arguments);
    let pusher = new Pusher('8e4bd9e0f75331b8b448', { 
      cluster: 'eu',
      encrypted: true
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      const response = {
        text: data.text,
        username: data.username,
        time: data.time
      };
      this.get('messages').pushObject(response);
    });
  },
  actions: {
    newMessage() {
      const text = this.get('newMessage');
      const username = this.get('activeUserService').get('user');
      const time = new Date();

      axios.post('http://localhost:3000/messages', { text, username, time });
      this.set('newMessage', '');
    }
  }
});