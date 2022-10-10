import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import HeaderHomeCmp from './components/HeaderHomeCmp';
import colors from '../../../styles/colors';
import PostsListCmp from '../Posts/PostsListCmp';
import CommentsModalize from '../../modals/CommentsModalize';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useDispatch, useSelector} from 'react-redux';
import {getMyInstitutions} from '../../../store/actions/institutionsActions';
import {getMyPartners} from '../../../store/actions';
import NewPostCmp from './components/NewPostCmp';
import {getRoomsList} from '../../../store/actions/chatActions';
// import YoutubePlayer from "react-native-youtube-iframe";

const HomeScreen = (props: any) => {
  const dispatch = useDispatch();

  const {user} = useSelector((state: any) => state?.User);

  const {defaultPartner} = useSelector((state: any) => state?.Inst);
  // console.log({user});
  const {navigation} = props;
  const modalizeRef = useRef(null);
  const openCommentModalize = () => {
    modalizeRef?.current?.open();
  };
  const closeCommentModalize = () => {
    modalizeRef?.current?.close();
  };

  function getMyInsitutions() {
    dispatch(getMyInstitutions({}));
    dispatch(getMyPartners({user: user?._id}));
    dispatch(
      getRoomsList(
        {
          partner: defaultPartner,
          limit: 1000,
        },
        () => {},
        (err: any) => {
          console.log({err});
        },
      ),
    );
  }
  const state = useSelector(s => s);
  // console.log({state});
  useEffect(() => {
    if (!!user) {
      getMyInsitutions();
    }
  }, [user]);

  return (
    <View style={styles.containerStyle}>
      <StatusBar barStyle={'default'} backgroundColor={colors.primary} />
      {/* <HeaderHomeCmp navigation={navigation} /> */}
      <View
        style={{
          backgroundColor: colors.white,
        }}>
        <NewPostCmp navigation={navigation} />
      </View>
      <PostsListCmp
        navigation={navigation}
        openCommentModalize={openCommentModalize}
        closeCommentModalize={closeCommentModalize}
      />

      {/* <YoutubePlayer
        height={300}
        play={false}
        videoId={"iee2TATGMyI"}
        onChangeState={()=>null}
      /> */}
      {/* <CommentsModalize modalizeRef={modalizeRef} /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.lightGray,
    // alignItems: "center",
    // justifyContent: "center"
  },
});
