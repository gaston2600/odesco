import { FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import fonts from '../../../../theme/fonts'
import colors from '../../../../styles/colors'
import I18n from 'react-native-i18n'
import { Divider } from '@rneui/themed'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { editPartner, getMyPartners, getOnePartner } from '../../../../store/actions'
import Icons from '../../../../styles/icons'
import AddFormationModalize from '../../../modals/mySpaces/AddFormationModalize'
import AddFormationModal from '../../../modals/mySpaces/AddFormationModal'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import ExperienceCmp from '../components/ExperienceCmp'
import TrainingCmp from '../components/TrainingCmp'
import { getOneTeacher } from '../../../../store/actions/teachersActions'
import AddExperienceModal from '../../../modals/mySpaces/AddExperienceModal'
import SkillCmp from '../components/SkillCmp'
import ButtonCmp from '../../../common/ButtonCmp'
import { ScreenWidth } from '@rneui/base'
import EditProfileModal from '../../../modals/mySpaces/EditProfileModal'

const PartnerDescProfileScreen = (props: any) => {
    const dispatch = useDispatch()
    const { partner,
        //  data 
    } = props;
    const [data, setData]: any = useState({})
    const [loadingProfile, setLoadingProfile] = useState(false)
    const { user } = useSelector((state: any) => state?.User)
    // console.log({ data });

    const refAddFormation = useRef(null)
    const [showAddFormationModal, setShowAddFormationModal] = useState(false)
    const [loadingAddFormation, setLoadingAddFormation] = useState(false)
    const [editAddFormationData, setEditAddFormationData] = useState(null)

    const [showAddExperienceModal, setShowAddExperienceModal] = useState(false)
    const [loadingAddExperience, setLoadingAddExperience] = useState(false)
    const [editAddExperienceData, setEditAddExperienceData] = useState(null)

    const [showAddSkill, setShowAddSkill] = useState(false)
    const [loadingAddSkill, setLoadingAddSkill] = useState(false)
    const [tempSkill, setTempSkill] = useState("")

    const [showEditProfile, setShowEditProfile] = useState(false)
    const [tempProfileData, setTempProfileData] = useState(null)

    function showEditProfileModal() {
        setShowEditProfile(true)
    }

    function openAddFormation() {
        setEditAddFormationData(null)
        setTimeout(() => {
            setShowAddFormationModal(true)
        }, 100);
    }

    function openAddExperience() {
        setEditAddExperienceData(null)
        setTimeout(() => {
            setShowAddExperienceModal(true)
        }, 100);
    }

    function getProfile() {
        setLoadingProfile(true)
        dispatch(getOneTeacher({
            teacher: partner
        }, res => {
            setLoadingProfile(false)
            setData(res?.teacher)

        },
            err => {
                setLoadingProfile(false)
                console.log(err);

            }

        ))
    }
    function checkDataAddFormation(params: any) {
        let msg = ""
        if (!params?.institution) {
            ToastAndroid.show("Nom", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.diplome) {
            ToastAndroid.show("diplome", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.startDate) {
            ToastAndroid.show("startDate", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.endDate) {
            ToastAndroid.show("endDate", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (moment(params?.endDate)?.isBefore(moment(params?.startDate))) {
            ToastAndroid.show("Vérifer date", ToastAndroid.SHORT)
            msg = "err"
        }
        else {
            msg = ""
        }
        return msg
    }
    function checkDataAddExperience(params: any) {
        let msg = ""
        if (!params?.institution) {
            ToastAndroid.show("Nom", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.profession) {
            ToastAndroid.show("profession", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.startDate) {
            ToastAndroid.show("startDate", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (!params?.endDate) {
            ToastAndroid.show("endDate", ToastAndroid.SHORT)
            msg = "err"
        }
        else if (moment(params?.endDate)?.isBefore(moment(params?.startDate))) {
            ToastAndroid.show("Vérifer date", ToastAndroid.SHORT)
            msg = "err"
        }
        else {
            msg = ""
        }
        return msg
    }
    function submitAddFormation(params: {
        institution: string,
        diplome: string,
        startDate: Date,
        endDate: Date,
    }) {
        if (!!checkDataAddFormation(params)) {
        }
        else {
            setLoadingAddFormation(true)
            dispatch(
                editPartner(
                    {
                        partner,
                        data: {
                            trainings: [...data?.trainings, params]
                        }
                    },
                    (res: any) => {
                        console.log("success edit trainings", res);
                        setShowAddFormationModal(false)
                        setLoadingAddFormation(false)
                        getProfile()
                    },
                    (err: any) => {
                        console.log({ err })
                        setLoadingAddFormation(false)
                    }
                )
            )


        }
    }
    function submitAddExperience(params: {
        institution: string,
        diplome: string,
        startDate: Date,
        endDate: Date,
    }) {
        if (!!checkDataAddExperience(params)) {
        }
        else {
            setLoadingAddExperience(true)
            dispatch(
                editPartner(
                    {
                        partner,
                        data: {
                            experiences: [...data?.experiences, params]
                        }
                    },
                    (res: any) => {
                        console.log("success edit experiences", res);
                        setShowAddExperienceModal(false)
                        setLoadingAddExperience(false)
                        getProfile()
                    },
                    (err: any) => {
                        console.log({ err })
                        setLoadingAddExperience(false)
                    }
                )
            )


        }
    }
    function editAddFormation(params: any) {
        if (!!checkDataAddFormation(params)) {
        }
        else {
            console.log({
                partner,
                data: {
                    trainings: data?.trainings?.map((v: any) => {
                        if (v?._id === params?._id) return params
                        else return v
                    })
                }
            });

            setLoadingAddFormation(true)
            dispatch(
                editPartner(
                    {
                        partner,
                        data: {
                            trainings: data?.trainings?.map((v: any) => {
                                if (v?._id === params?._id) return params
                                else return v
                            })
                        }
                    },
                    (res: any) => {
                        console.log("success edit trainings", res);
                        setShowAddFormationModal(false)
                        setLoadingAddFormation(false)
                        getProfile()
                    },
                    (err: any) => {
                        console.log({ err })
                        setLoadingAddFormation(false)
                    }
                )
            )


        }
    }
    function editAddExperience(params: any) {
        if (!!checkDataAddExperience(params)) {
        }
        else {
            setLoadingAddExperience(true)
            dispatch(
                editPartner(
                    {
                        partner,
                        data: {
                            experiences: data?.experiences?.map((v: any) => {
                                if (v?._id === params?._id) return params
                                else return v
                            })
                        }
                    },
                    (res: any) => {
                        console.log("success edit experiences", res);
                        setShowAddExperienceModal(false)
                        setLoadingAddExperience(false)
                        getProfile()
                    },
                    (err: any) => {
                        console.log({ err })
                        setLoadingAddExperience(false)
                    }
                )
            )


        }
    }

    function editTraining(params: any) {
        setEditAddFormationData(params)
        setShowAddFormationModal(true)
    }

    function editExperience(params: any) {
        setEditAddExperienceData(params)
        setShowAddExperienceModal(true)
    }

    function deleteFormation(params: any) {
        setLoadingAddFormation(true)
        dispatch(
            editPartner(
                {
                    partner,
                    data: {
                        trainings: data?.trainings?.filter((v: any) => v?._id !== params?._id)
                    }
                },
                (res: any) => {
                    console.log("success delete trainings", res);
                    setShowAddFormationModal(false)
                    setLoadingAddFormation(false)
                    getProfile()
                },
                (err: any) => {
                    console.log({ err })
                    setLoadingAddFormation(false)
                }
            )
        )
    }

    function deleteExperience(params: any) {
        setLoadingAddExperience(true)
        dispatch(
            editPartner(
                {
                    partner,
                    data: {
                        experiences: data?.experiences?.filter((v: any) => v?._id !== params?._id)
                    }
                },
                (res: any) => {
                    console.log("success delete experiences", res);
                    setShowAddExperienceModal(false)
                    setLoadingAddExperience(false)
                    getProfile()
                },
                (err: any) => {
                    console.log({ err })
                    setLoadingAddExperience(false)
                }
            )
        )
    }

    function addSkill(params: any) {
        setLoadingAddSkill(true)
        dispatch(
            editPartner(
                {
                    partner,
                    data: {
                        skills: [...data?.skills, params]
                    }
                },
                (res: any) => {
                    console.log("success add skills", res);
                    setShowAddSkill(false)
                    setTempSkill("")
                    setLoadingAddSkill(false)
                    getProfile()
                },
                (err: any) => {
                    console.log({ err })
                    setLoadingAddSkill(false)
                }
            )
        )
    }

    function deleteSkill(params: any) {
        dispatch(
            editPartner(
                {
                    partner,
                    data: {
                        skills: data?.skills?.filter((v: any) => v !== params)
                    }
                },
                (res: any) => {
                    console.log("success delete skills", res);
                    getProfile()
                },
                (err: any) => {
                    console.log({ err })
                }
            )
        )
    }

    useEffect(() => {
        getProfile()
    }, [])



    return (
        <ScrollView
            style={styles.containerStyle}
            refreshControl={
                <RefreshControl
                    style={{ width: 0, height: 0 }}
                    colors={[colors.primary]}
                    refreshing={loadingProfile}
                    onRefresh={() => {
                        getProfile()
                    }}
                />
            }
        >

            <View style={styles.titleContainerStyle}>
                <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold, fontSize: fonts.size.font14 }]}>{`${data?.first_name} ${data?.last_name}`}</Text>
                <Pressable
                    onPress={showEditProfileModal}
                    style={styles.addIcionContainerStyle}>
                    <Icons.AntDesign name="edit" size={20} color={colors.primary} />
                </Pressable>
            </View>


            {!!data?.pro_email && <View style={styles.rowContainer}>
                <Icons.FontAwesome name={"envelope-o"} size={15} color={colors.grey} style={styles.iconDescStyle} />
                <Text style={styles.titleTextStyle}>{`${data?.pro_email}`}</Text>
            </View>}
            {!!data?.pro_mobile && <View style={styles.rowContainer}>
                <Icons.FontAwesome name={"phone"} size={15} color={colors.grey} style={styles.iconDescStyle} />
                <Text style={styles.titleTextStyle}>{`${data?.pro_mobile}`}</Text>
            </View>}
            {!!data?.address && <View style={styles.rowContainer}>
                <Icons.FontAwesome name={"map"} size={15} color={colors.grey} style={styles.iconDescStyle} />
                <Text style={styles.titleTextStyle}>{`${data?.address}`}</Text>
            </View>}


            {!!data?.trainings?.length &&
                <View style={styles.sectionContainerStyle}>
                    <View style={styles.titleContainerStyle}>
                        <Text style={styles.sectionTextStyle}>{I18n.t("trainings")}</Text>
                        <Pressable
                            onPress={openAddFormation}
                            style={styles.addIcionContainerStyle}>
                            <Icons.AntDesign name="pluscircleo" size={20} color={colors.primary} />
                        </Pressable>
                    </View>
                    <Divider orientation='horizontal' color={colors.primary} />

                    <FlatList
                        data={data?.trainings}
                        renderItem={({ item }) => <TrainingCmp edit={editTraining} data={item} deleteFormation={deleteFormation} />}
                        keyExtractor={item => item?._id}
                        ItemSeparatorComponent={() => <Divider />}
                    />
                </View>}
            {!!data?.experiences?.length &&
                <View style={styles.sectionContainerStyle}>
                    <View style={styles.titleContainerStyle}>
                        <Text style={styles.sectionTextStyle}>{I18n.t("experiences")}</Text>
                        <Pressable
                            onPress={openAddExperience}
                            style={styles.addIcionContainerStyle}>
                            <Icons.AntDesign name="pluscircleo" size={20} color={colors.primary} />
                        </Pressable>
                    </View>
                    <Divider orientation='horizontal' color={colors.primary} />
                    <FlatList
                        data={data?.experiences}
                        renderItem={({ item }) => <ExperienceCmp edit={editExperience} data={item} deleteExperience={deleteExperience} />}
                        // renderItem={({ item }) => renderExperience(item)}
                        keyExtractor={item => item?._id}
                        ItemSeparatorComponent={() => <Divider />}
                    />
                </View>}
            {!!data?.skills?.length &&
                <View style={styles.sectionContainerStyle}>
                    <View style={styles.titleContainerStyle}>
                        <Text style={styles.sectionTextStyle}>{I18n.t("skills")}</Text>
                        <Pressable
                            onPress={() => setShowAddSkill(!showAddSkill)}
                            style={styles.addIcionContainerStyle}>
                            <Icons.AntDesign name="pluscircleo" size={20} color={colors.primary} />
                        </Pressable>
                    </View>
                    <Divider orientation='horizontal' color={colors.primary} />
                    {
                        showAddSkill &&
                        <View>
                            <TextInput
                                value={tempSkill}
                                onChangeText={setTempSkill}
                                placeholder={I18n.t("add_skill")}
                                style={styles.addSkilTextInputStyle}
                            />
                            <View style={styles.buttonContainerStyle}>
                                <ButtonCmp
                                    label={I18n.t("cancel")}
                                    action={() => {
                                        setShowAddSkill(false)
                                        setTempSkill("")
                                    }}
                                    width={ScreenWidth * .3}
                                />
                                <ButtonCmp
                                    label={I18n.t("save")}
                                    action={() => addSkill(tempSkill)}
                                    width={ScreenWidth * .3}
                                    loading={loadingAddSkill}
                                />
                            </View>
                        </View>
                    }
                    <FlatList
                        data={data?.skills}
                        horizontal
                        renderItem={({ item }) => <SkillCmp data={item} deleteSkill={deleteSkill} />}
                        // renderItem={({ item }) => renderSkills(item)}
                        keyExtractor={item => item?._id}
                    />
                </View>}
            <AddFormationModal
                visible={showAddFormationModal}
                setVisible={setShowAddFormationModal}
                submit={submitAddFormation}
                loading={loadingAddFormation}
                editData={editAddFormationData}
                edit={editAddFormation}
            />

            <AddExperienceModal
                visible={showAddExperienceModal}
                setVisible={setShowAddExperienceModal}
                submit={submitAddExperience}
                loading={loadingAddExperience}
                editData={editAddExperienceData}
                edit={editAddExperience}
            />
            <EditProfileModal
                visible={showEditProfile}
                setVisible={setShowEditProfile}
                data={data}
                refresh={getProfile}
            />
        </ScrollView>
    )
}

export default PartnerDescProfileScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        // marginBottom :50
    },
    sectionTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font14,
        color: colors.darkBlue,
        // marginLeft: 15
    },
    titleTextStyle: {
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        color: colors.gray,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    itemStyle: {
        flexDirection: "row",
    },
    itemContainerStyle: {
        padding: 10,
        marginTop: 5,
        flex: 9
    },
    sectionContainerStyle: {
        marginVertical: 5
    },
    titleContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    addIcionContainerStyle: {
        padding: 5
    },
    iconDescStyle: {
        marginRight: 10
    },
    editIconContainerStyle: {
        padding: 5,
        flex: 1
    },
    addSkilTextInputStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.grey,
        marginVertical: 10,
        fontFamily: fonts.type.NunitoMedium,
        fontSize: fonts.size.font12,
        paddingRight: 10
    },
    buttonContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 15
    },
})