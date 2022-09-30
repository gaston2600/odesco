import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import metrics from '../../../theme/metrics';
import {getMyInstitutions} from '../../../store/actions/institutionsActions';
import {Button, Divider, Icon, Overlay} from '@rneui/themed';
import I18n from 'react-native-i18n';
import fonts from '../../../theme/fonts';
import AvatarCmp from '../../common/AvatarCmp';
import colors from '../../../styles/colors';
import {extractImage} from '../../../helpers/extractImage';
import {getMyPartners} from '../../../store/actions';
const {screenWidth, screenHeight} = metrics;

const SelectInstitutionModal = (props: any) => {
  const dispatch = useDispatch();

  const {visible, setVisible, confirm, selectedList} = props;
  const {myInstitutions, myPartners, loading} = useSelector(
    (state: any) => state?.Inst,
  );
  const {user} = useSelector((state: any) => state?.User);
  function getMyInsitutions() {
    dispatch(getMyInstitutions({}));
    dispatch(getMyPartners({user: user?._id}));
  }

  useEffect(() => {
    getMyInsitutions();
  }, []);

  const renderInstitution = (data: any) => {
    return (
      <TouchableOpacity
        key={`institution_${data?._id}`}
        style={
          selectedList?.map((v: any) => v?._id)?.includes(data?.institute?._id)
            ? styles.selectedInstContainerStyle
            : styles.instContainerStyle
        }
        onPress={() => {
          confirm({_id: data?.institute?._id, type: 'Institution'});
        }}>
        <AvatarCmp
          name={String(data?.institute?.name)?.slice(0, 2)}
          size={30}
        />
        <Text
          style={[
            styles.instTextStyle,
            {
              color: selectedList
                ?.map((v: any) => v?._id)
                ?.includes(data?.institute?._id)
                ? colors.white
                : colors.primary,
            },
          ]}>
          {data?.institute?.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderPartner = (data: any) => {
    return (
      <TouchableOpacity
        key={`institution_${data?._id}`}
        style={
          selectedList?.map((v: any) => v?._id)?.includes(data?._id)
            ? styles.selectedInstContainerStyle
            : styles.instContainerStyle
        }
        onPress={() => {
          confirm({_id: data?._id, type: 'Partner'});
        }}>
        <AvatarCmp
          name={String(data?.first_name)?.slice(0, 2)}
          uri={extractImage(data?.avatar?.path)}
          size={30}
        />
        <Text
          style={[
            styles.instTextStyle,
            {
              color: selectedList?.map((v: any) => v?._id)?.includes(data?._id)
                ? colors.white
                : colors.primary,
            },
          ]}>
          {`${data?.first_name} ${data?.last_name}`}
        </Text>
      </TouchableOpacity>
    );
  };
  // const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <Overlay
      style={{
        borderRadius: 5,
      }}
      isVisible={visible}
      onBackdropPress={toggleOverlay}>
      {myPartners?.length ? (
        <Text style={styles.titleTextStyle}>{I18n.t('partners')}</Text>
      ) : null}
      {myPartners?.map((item: any) => renderPartner(item))}
      {myPartners?.length && myInstitutions?.length ? (
        <Divider
          orientation="horizontal"
          style={{
            marginVertical: 5,
          }}
        />
      ) : null}
      {myInstitutions?.length ? (
        <Text style={styles.titleTextStyle}>{I18n.t('institutions')}</Text>
      ) : null}
      {myInstitutions
        ?.filter((v: any) => v?.institute?.active)
        ?.map((item: any) => renderInstitution(item))}
    </Overlay>
  );
};

export default SelectInstitutionModal;

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleTextStyle: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.type.NunitoRegular,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  instContainerStyle: {
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.grey,
  },
  selectedInstContainerStyle: {
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.grey,
    backgroundColor: colors.primary,
  },
  instTextStyle: {
    fontSize: fonts.size.font12,
    fontFamily: fonts.type.NunitoMedium,
    marginLeft: 5,
  },
});
