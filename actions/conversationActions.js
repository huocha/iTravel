import * as firebase from 'firebase';
import 'firebase/firestore';

const fetchConversations = (uid, conversationActions) => {

  firebase.database()
    .ref('messages')
    .once('value')
    .then(snapshot => {
      const data = snapshot.val() || null;
      const existingUserConversations = Object.keys(data).reduce((acc, curr) => {
        if (curr.includes(uid)) {
          const currentConversation = data[curr];
          const lastIndex = Object.keys(currentConversation).pop();
          const latestMessage = currentConversation[lastIndex];

          let minifyData = {
            id: curr.replace(uid, ''),
            latestMessage,
          }

          acc.push(minifyData)
        }
        return acc;
      }, []);
      console.log({ existingUserConversations })
      return conversationActions.fetchConversationsSuccess(existingUserConversations)
    })
    .catch(error => conversationActions.fetchConversationsFailure(error))

  return {
    type: 'FETCH_CONVERSATIONS'
  }
}

const fetchConversationsSuccess = response => ({
  type: 'FETCH_CONVERSATIONS_SUCCESS',
  payload: response
})

const fetchConversationsFailure = _ => ({
  type: 'FETCH_CONVERSATIONS_FAILURE'
})


export {
    fetchConversations,
    fetchConversationsSuccess,
    fetchConversationsFailure
}
