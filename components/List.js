import React from 'react';
import { FlatList } from 'react-native';

import Footer from './Footer/Footer';
import Item from './Item/Item';

class List extends React.Component {
  renderItem = ({ item }) => (
    <Item {...item} itemKey={item.key} user={this.props.user} userActions={this.props.userActions}/>
  );

  keyExtractor = item => item.key;
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
        style={{ marginBottom: 40 }}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        renderItem={this.renderItem}
        {...props}
      />
    );
  }
}
export default List;
