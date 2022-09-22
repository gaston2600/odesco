import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getTrainingList} from '../../../store/actions/trainingActions';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import I18n from 'react-native-i18n';
import TrainingCmp from './components/TrainingCmp';

const TrainingScreen = (props: any) => {
  const dispatch = useDispatch();
  const {space} = props;
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);

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
        data={trainings
          ?.concat(trainings)
          ?.concat(trainings)
          ?.concat(trainings)
          ?.concat(trainings)}
        renderItem={({item}: any) => <TrainingCmp data={item} />}
        keyExtractor={(item: any) => item?._id}
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
  );
};

export default TrainingScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
