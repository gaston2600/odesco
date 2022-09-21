import {
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import MemberCmp from '../../modules/Network/components/MemberCmp';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import I18n from 'react-native-i18n';
import Icons from '../../../styles/icons';
import {Divider} from '@rneui/themed';
import fonts from '../../../theme/fonts';
const AddConversationModal = (props: any) => {
  const {visible, setVisible} = props;
  const {members, loading} = useSelector((state: any) => state?.Network);
  const [searchInput, setSearchInput] = useState('');
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.titleTextStyle}>{I18n.t('contacts')}</Text>
        <Pressable
          onPress={() => setVisible(false)}
          style={styles.closeContainerStyle}>
          <Icons.AntDesign name="left" size={20} color={colors.black} />
        </Pressable>
      </View>
      <Divider orientation="horizontal" />
      <View style={styles.searchContainerStyle}>
        <TextInput
          value={searchInput}
          onChangeText={setSearchInput}
          style={styles.textInputStyle}
          placeholder={I18n.t('search')}
          focusable
        />
        <Pressable
          onPress={() => {
            if (!!searchInput) {
              setSearchInput('');
            }
          }}>
          <Icons.AntDesign
            name={!!searchInput ? 'close' : 'search1'}
            size={20}
            color={!!searchInput ? colors.black : colors.grey}
          />
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          data={members?.filter((v: any) =>
            String(`${v?.user?.first_name} ${v?.user?.last_name}`)
              ?.toUpperCase()
              ?.includes(String(searchInput)?.toUpperCase()),
          )}
          renderItem={({item}: any) => (
            <MemberCmp data={item?.user} type="member" />
          )}
          keyExtractor={item => item?._id}
          numColumns={3}
          refreshControl={
            <RefreshControl
              style={{width: 0, height: 0}}
              colors={[colors.primary]}
              refreshing={loading}
              onRefresh={() => {
                // getPage();
              }}
            />
          }
          ListEmptyComponent={() => (
            <View style={globalStyles.center}>
              <Text style={globalStyles.defaultText}>
                {I18n.t('empty_result')}
              </Text>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

export default AddConversationModal;

const styles = StyleSheet.create({
  headerContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  titleTextStyle: {
    fontFamily: fonts.type.NunitoSemiBold,
    fontSize: fonts.size.font14,
  },
  closeContainerStyle: {
    position: 'absolute',
    left: 15,
    right: 15,
  },
  searchContainerStyle: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputStyle: {
    fontFamily: fonts.type.NunitoMedium,
    fontSize: fonts.size.font12,
    color: colors.gray,
    flex: 1,
  },
});
