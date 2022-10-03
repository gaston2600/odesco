import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectSpace} from '../../../../store/actions';
import SelectInstitutionModal from '../../../modals/institutions/SelectInstitutionModal';
import AvatarCmp from '../../../common/AvatarCmp';
import {extractImage} from '../../../../helpers/extractImage';

const SelectedSpaceIcon = () => {
  const dispatch = useDispatch();
  const {user, selectedSpace} = useSelector((state: any) => state?.User);
  const {myPartners, defaultPartner, myInstitutions} = useSelector(
    (state: any) => state?.Inst,
  );
  const [visibleSelectInst, setVisibleSelectInst] = useState(false);

  function confirmSelecInstModal(params: any) {
    let temp = null;
    if (params?.type === 'Partner') {
      temp = {
        ...myPartners?.filter((v: any) => v?._id === params?._id)?.[0],
        type: 'Partner',
      };
    } else {
      temp = {
        ...myInstitutions?.filter(
          (v: any) => v?.institute?._id === params?._id,
        )?.[0]?.institute,
        type: 'Institution',
      };
    }
    dispatch(selectSpace(temp));
    setVisibleSelectInst(false);
  }

  useEffect(() => {
    const temp = {
      ...myPartners?.filter((v: any) => v?._id === defaultPartner)?.[0],
      type: 'Partner',
    };
    if (!!defaultPartner && !!myPartners?.length && !selectedSpace) {
      dispatch(selectSpace(temp));
    }
  }, [myPartners, defaultPartner]);

  return (
    <Pressable
      onPress={() => {
        setVisibleSelectInst(true);
      }}>
      <AvatarCmp
        name={String(
          selectedSpace?.type === 'Partner'
            ? selectedSpace?.first_name
            : selectedSpace?.name,
        )?.slice(0, 2)}
        uri={extractImage(selectedSpace?.avatar?.path)}
        size={30}
      />
      <SelectInstitutionModal
        visible={visibleSelectInst}
        setVisible={setVisibleSelectInst}
        confirm={confirmSelecInstModal}
        selectedList={[{_id: selectedSpace?._id, type: selectedSpace?.type}]}
      />
    </Pressable>
  );
};

export default SelectedSpaceIcon;

const styles = StyleSheet.create({
  cotainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
