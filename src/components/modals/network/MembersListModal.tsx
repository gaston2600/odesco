import {
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icons from '../../../styles/icons';
import colors from '../../../styles/colors';
import I18n from 'react-native-i18n';
import fonts from '../../../theme/fonts';
import {Divider} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {getPartnersList} from '../../../store/actions';
import MemberCmp from '../../modules/Network/components/MemberCmp';
import globalStyles from '../../../styles/globalStyles';
import {getNetwork} from '../../../store/actions/networkActions';

const MembersListModal = (props: any) => {
  const {visible, setVisible} = props;
  const {members, pendings, requests} = useSelector(
    (state: any) => state?.Network,
  );
  const {defaultPartner} = useSelector((state: any) => state?.Inst);

  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  function memberType(params: any) {
    if (members?.map((v: any) => v?.user?._id)?.includes(params))
      return 'member';
    if (pendings?.map((v: any) => v?.user?._id)?.includes(params))
      return 'pending';
    if (requests?.map((v: any) => v?.user?._id)?.includes(params))
      return 'invitation';
    return 'add';
  }

  function getPage() {
    setLoading(true);
    dispatch(
      getPartnersList(
        {
          limit: 100,
          filters: {searchInput},
        },
        (res: any) => {
          setLoading(false);
          setPartners(
            res?.partners?.filter((v: any) => v?._id !== defaultPartner),
          );
        },
        (err: any) => {
          setLoading(false);
          console.log({err});
        },
      ),
    );
    dispatch(
      getNetwork({
        partner: defaultPartner,
      }),
    );
  }
  useEffect(() => {
    getPage();
    return () => {
      setPartners([]);
    };
  }, [searchInput]);

  useEffect(() => {
    console.log({partners});
  }, [partners]);

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={styles.containerStyle}>
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
            data={partners}
            renderItem={({item}: any) => (
              <MemberCmp
                data={item}
                type={memberType(item?._id)}
                refresh={getPage}
              />
            )}
            keyExtractor={item => item?._id}
            numColumns={2}
            refreshControl={
              <RefreshControl
                style={{width: 0, height: 0}}
                colors={[colors.primary]}
                refreshing={loading}
                onRefresh={() => {
                  getPage();
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
      </View>
    </Modal>
  );
};

export default MembersListModal;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
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
