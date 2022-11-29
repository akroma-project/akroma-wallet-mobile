import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, ListItem } from '@ui-kitten/components';
export const Pagination = ({ currentPage, totalPages, onPress }) => {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    let lastPage = currentPage;
    const temporalPages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (temporalPages.length === 0 && i > 1) {
        temporalPages.push(1);
        temporalPages.push('...');
      }
      if (i > currentPage - 3 && temporalPages.length < 6) {
        temporalPages.push(i);
        lastPage = i;
      }
    }
    if (lastPage < totalPages) {
      temporalPages.push('...');
      temporalPages.push(totalPages);
    }
    setPages(temporalPages);
  }, [totalPages, currentPage]);
  const renderItem = ({ item }) => (
    <ListItem
      style={[item === currentPage && styles.selected, styles.item]}
      title={item}
      onPress={() => {
        if (item !== '...') {
          onPress(item);
        }
      }}
    />
  );

  return (
    <View>
      <List horizontal={true} centerContent={true} style={styles.container} data={pages} renderItem={renderItem} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
  selected: {
    backgroundColor: '#F17100',
  },
  item: {
    minWidth: 40,
  },
});
