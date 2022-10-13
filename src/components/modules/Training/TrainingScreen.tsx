import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getTrainingList} from '../../../store/actions/trainingActions';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import I18n from 'react-native-i18n';
import TrainingCmp from './components/TrainingCmp';
import Icons from '../../../styles/icons';
import AddTrainingModal from '../../modals/Training/AddTrainingModal';

const TrainingScreen = (props: any) => {
  const dispatch = useDispatch();
  const {space} = props;
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddFormation, setShowAddFormation] = useState(false);

  function getPage() {
    setLoading(true);
    dispatch(
      getTrainingList(
        {
          filters: {
            institution: space?._id,
          },
        },
        (res: any) => {
          setLoading(false);
          setTrainings(res?.trainings);
        },
        (err: any) => {
          setLoading(false);
          console.log({err});
        },
      ),
    );
  }
  useEffect(() => {
    getPage();
    return () => {
      setTrainings([]);
    };
  }, []);

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={trainings}
        renderItem={({item}: any) => <TrainingCmp data={item} />}
        keyExtractor={(item: any) => item?._id}
        // numColumns={2}
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
      {!!space && (
        <Pressable
          onPress={() => {
            setShowAddFormation(!showAddFormation);
          }}
          style={styles.addContainerStyle}>
          <Icons.AntDesign name="plus" size={20} color={colors.white} />
        </Pressable>
      )}
      {showAddFormation && (
        <AddTrainingModal
          visible={showAddFormation}
          setVisible={setShowAddFormation}
          space={space}
          refresh={getPage}
        />
      )}
    </View>
  );
};

export default TrainingScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  addContainerStyle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 50,
  },
});
