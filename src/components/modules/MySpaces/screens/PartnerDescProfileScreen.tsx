import { FlatList, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import fonts from '../../../../theme/fonts'
import colors from '../../../../styles/colors'
import I18n from '../../../../translation/I18n'
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

const PartnerDescProfileScreen = (props: any) => {
    const dispatch = useDispatch()
    const { partner,
        //  data 
    } = props;
    const [data, setData] = useState({})
    const { user } = useSelector((state: any) => state?.User)
    console.log({ data });

    const refAddFormation = useRef(null)
    const [showAddFormationModal, setShowAddFormationModal] = useState(false)
    const [loadingAddFormation, setLoadingAddFormation] = useState(false)

    function openAddFormation() {
        setShowAddFormationModal(true)
    }

    function getProfile() {
        dispatch(getOneTeacher({
            teacher: partner
        }, res => {
            console.log("getonePartner", res);
            setData(res?.teacher)

        },
            err => {
                console.log(err);

            }

        ))

        // dispatch(getOnePartner({
        //     partner
        // }, res => {
        //     console.log("getonePartner", res);

        // },
        //     err => {
        //         console.log(err);

        //     }

        // ))
    }

    function submitAddFromation(params: {
        institution: string,
        diplome: string,
        startDate: Date,
        endDate: Date,
    }) {

        if (!params?.institution) ToastAndroid.show("Nom", ToastAndroid.SHORT)
        else if (!params?.diplome) ToastAndroid.show("diplome", ToastAndroid.SHORT)
        else if (!params?.startDate) ToastAndroid.show("startDate", ToastAndroid.SHORT)
        else if (!params?.endDate) ToastAndroid.show("endDate", ToastAndroid.SHORT)
        else if (moment(params?.endDate)?.isBefore(moment(params?.startDate))) ToastAndroid.show("Vérifer date", ToastAndroid.SHORT)
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

    useEffect(() => {
        getProfile()
    }, [])


    function renderTraining(params: any) {
        return (
            <View style={styles.itemStyle}>
                <View style={styles.itemContainerStyle}>
                    <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold }]}>{params?.institution}</Text>
                    <Text style={styles.titleTextStyle}>{params?.diplome}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.titleTextStyle}>{moment(params?.startDate).format("MMM YYYY")}</Text>
                        {params?.endDate && <Text style={styles.titleTextStyle}> - </Text>}
                        {params?.endDate && <Text style={styles.titleTextStyle}>{moment(params?.endDate).format("MMM YYYY")}</Text>}
                    </View>
                </View>
                <Pressable style={styles.editIconContainerStyle}>
                    <Icons.Entypo name="dots-three-vertical" size={15} style={styles.editIconContainerStyle} />
                </Pressable>
            </View>

        )
    }

    function renderSkills(params: any) {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold }]}>{params}</Text>
                <Divider orientation='horizontal' />
            </View>
        )
    }



    return (
        <ScrollView style={styles.containerStyle}>

            <View style={styles.titleContainerStyle}>
                <Text style={[styles.titleTextStyle, { fontFamily: fonts.type.NunitoBold, fontSize: fonts.size.font14 }]}>{`${data?.first_name} ${data?.last_name}`}</Text>
                <Pressable
                    onPress={openAddFormation}
                    style={styles.addIcionContainerStyle}>
                    <Icons.AntDesign name="edit" size={20} color={colors.primary} />
                </Pressable>
            </View>


            {!!data?.email && <View style={styles.rowContainer}>
                <Icons.FontAwesome name={"envelope-o"} size={15} color={colors.grey} style={styles.iconDescStyle} />
                <Text style={styles.titleTextStyle}>{`${data?.email}`}</Text>
            </View>}
            {!!data?.phone && <View style={styles.rowContainer}>
                <Icons.FontAwesome name={"phone"} size={15} color={colors.grey} style={styles.iconDescStyle} />
                <Text style={styles.titleTextStyle}>{`${data?.phone}`}</Text>
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
                        renderItem={({ item }) => <TrainingCmp data={item} />}
                        // renderItem={({ item }) => renderTraining(item)}
                        keyExtractor={item => item?._id}
                        ItemSeparatorComponent={() => <Divider />}
                    />
                </View>}
            {!!data?.experiences?.length &&
                <View style={styles.sectionContainerStyle}>
                    <View style={styles.titleContainerStyle}>
                        <Text style={styles.sectionTextStyle}>{I18n.t("experiences")}</Text>
                        <Pressable style={styles.addIcionContainerStyle}>
                            <Icons.AntDesign name="pluscircleo" size={20} color={colors.primary} />
                        </Pressable>
                    </View>
                    <Divider orientation='horizontal' color={colors.primary} />
                    <FlatList
                        data={data?.experiences}
                        renderItem={({ item }) => <ExperienceCmp data={item} />}
                        // renderItem={({ item }) => renderExperience(item)}
                        keyExtractor={item => item?._id}
                        ItemSeparatorComponent={() => <Divider />}
                    />
                </View>}
            {!!data?.skills?.length &&
                <View style={styles.sectionContainerStyle}>
                    <View style={styles.titleContainerStyle}>
                        <Text style={styles.sectionTextStyle}>{I18n.t("skills")}</Text>
                        <Pressable style={styles.addIcionContainerStyle}>
                            <Icons.AntDesign name="pluscircleo" size={20} color={colors.primary} />
                        </Pressable>
                    </View>
                    <Divider orientation='horizontal' color={colors.primary} />
                    <FlatList
                        data={data?.skills}
                        horizontal
                        renderItem={({ item }) => renderSkills(item)}
                        keyExtractor={item => item?._id}
                    />
                </View>}
            <AddFormationModal
                visible={showAddFormationModal}
                setVisible={setShowAddFormationModal}
                submit={submitAddFromation}
                loading={loadingAddFormation}
            />
        </ScrollView>
    )
}

export default PartnerDescProfileScreen

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10
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
    }

})