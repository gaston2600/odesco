import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  getInstPosts,
  getPartnerPosts,
  getPostsList,
  getTeacherPosts,
} from '../../../../store/actions';
import PostCmp from '../../Posts/PostCmp';
import colors from '../../../../styles/colors';
import fonts from '../../../../theme/fonts';
import ImagesViewModal from '../../../modals/ImagesViewModal';
import {useIsFocused} from '@react-navigation/native';

const ProfilePostsScreen = (props: any) => {
  const {partner, type, navigation} = props;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  function getPosts() {
    setLoading(true);
    if (type !== 'Partner') {
      dispatch(
        getInstPosts(
          {
            limit: 100,
            offset: 0,
            data: {
              institution: partner,
            },
          },
          (res: any) => {
            // console.log({ res });
            setPosts(res?.posts);
            setLoading(false);
          },
          (err: any) => {
            setLoading(false);
            console.log({err});
          },
        ),
      );
    } else {
      dispatch(
        getPartnerPosts(
          {
            limit: 100,
            offset: 0,
            partner,
          },
          (res: any) => {
            // console.log({ res });
            setPosts(res?.posts);
            setLoading(false);
          },
          (err: any) => {
            setLoading(false);
            console.log({err});
          },
        ),
      );
    }
  }

  const [isVisibleImageModal, setIsVisibleImageModal] = useState(false);
  const [imagesModalList, setImagesModalList] = useState([]);
  const showImages = (images: any) => {
    setIsVisibleImageModal(true);
    setImagesModalList(images);
  };
  const hiddeImageModal = () => setIsVisibleImageModal(false);

  useEffect(() => {
    getPosts();
  }, [partner, isFocused]);

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <PostCmp
            data={item}
            navigation={navigation}
            showImages={showImages}
            refresh={getPosts}
          />
        )}
        keyExtractor={(item: any) => item?._id}
        refreshControl={
          <RefreshControl
            style={{width: 0, height: 0}}
            colors={[colors.primary]}
            refreshing={loading}
            onRefresh={() => {
              getPosts();
            }}
          />
        }
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.type.NunitoMedium,
                fontSize: fonts.size.font12,
                color: colors.grey,
              }}>
              Aucune Publication
            </Text>
          </View>
        )}
      />
      <ImagesViewModal
        visible={isVisibleImageModal}
        close={hiddeImageModal}
        images={imagesModalList}
      />
    </View>
  );
};

export default ProfilePostsScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
});
