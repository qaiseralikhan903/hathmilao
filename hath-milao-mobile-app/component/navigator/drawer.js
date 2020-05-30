/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import {
  createAppContainer,
  NavigationActions,
  StackActions,
  createSwitchNavigator
} from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform, Dimensions } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EventScreen from "../screens/EventScreen";
import ChallengeScreen from "../screens/Challenge";
import CompanyScreen from "../screens/Company";
import FYPScreen from "../screens/FYP";
import MessagesScreen from "../screens/Messages";
import DrawerMenu from "./DrawerMenu";
import AuthLoadingScreen from "./AuthLoadingScreen";
import JobDetail from "../screens/JobDetail";
import Notification from "../screens/Notification";
import Login from "../Start/Login/Login";
import F_Password from "../Start/Login/ForgetPassword";
import Signup from "../Start/SignUp/SignUp";
import TestPage from "../TestPage";
import BasicEdit from "../ProfileTabs/BasicEdit";
import EducationAdd from "../ProfileTabs/EducationAdd";
import EditEducation from "../ProfileTabs/EditEducation";
import ExperienceEdit from "../ProfileTabs/ExperienceEdit";
import ExperienceAdd from "../ProfileTabs/ExperienceAdd";
import SkillUpdate from "../ProfileTabs/SkillUpdate";
import LanguageUpdate from "../ProfileTabs/LanguageUpdate";
import ConversationScreen from "../Chat/conversations.screen";
import SingleChatScreen from "../Chat/single-chat.screen";
import  ErrorScreen  from "../src/ErrorScreen";

const Width = Dimensions.get("window").width * 0.8;

const Start = createStackNavigator({
  login: {
    screen: Login,
    navigationOptions: { header: null }
  },
  signup: {
    screen: Signup,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 }
    },
    initialRouteName: "login"
  },
  ForgotPassword: {
    screen: F_Password,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 }
    },
    initialRouteName: "login"
  },
  ErrorScreen: {
    screen: ErrorScreen,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 }
    }
  }
});

const ProfileNavi = createStackNavigator({
  ProfileView: {
    screen: ProfileScreen,
    navigationOptions: { header: null }
  },
  EditBasicProfile: {
    screen: BasicEdit,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 },
      title: "Basic Edit"
    }
  },
  Educationadd: {
    screen: EducationAdd,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 },
      title: "Add Education"
    }
  },
  EducationEdit: {
    screen: EditEducation,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 },
      title: "Edit Education"
    }
  },
  EditExperience: {
    screen: ExperienceEdit,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 },
      title: "Edit Experience"
    }
  },
  AddExperience: {
    screen: ExperienceAdd,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 },
      title: "Add Experience"
    }
  },
  UpdateSkill: {
    screen: SkillUpdate,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 },
      title: "Skill Edit"
    }
  },
  UpdateLanguage: {
    screen: LanguageUpdate,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 },
      title: "Language Edit"
    }
  },
  ErrorScreen: {
    screen: ErrorScreen,
    navigationOptions: {
      headerStyle: { backgroundColor: "#f4f5f7", elevation: 0 },
      title: "Network Error"
    }
  }
});

const Detail_job = createStackNavigator({
  Jobs: {
    screen: HomeScreen,
    navigationOptions: { header: null }
  },
  Job_Detail: {
    screen: JobDetail,
    navigationOptions: { header: null }
  }
});

const Notification_stack = createStackNavigator({
  Noti: {
    screen: Notification,
    navigationOptions: { header: null }
  },
  Job_Detail: {
    screen: JobDetail,
    navigationOptions: { header: null }
  }
});

const Drawer = createDrawerNavigator(
  {  Profile: ProfileNavi,
    Jobs: { screen: Detail_job },
  
    Challenge: ChallengeScreen,
    Events: EventScreen,
   
    
    Company: CompanyScreen,
    

    
    FYP: FYPScreen,
    Events: EventScreen,
    Messages: MessagesScreen,
    Notification: Notification_stack,

    Conversations: ConversationScreen,
    SingleChat: SingleChatScreen
  },
  {
    drawerBackgroundColor: "rgba(255,255,255,.9)",
    contentOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "#6b52ae"
    },
    drawerWidth: Width,
    contentComponent: ({ navigation }) => {
      return <DrawerMenu navigation={navigation} />;
    }
  }
);

const MainStack = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Testpage: TestPage,
  LoginPage: {
    screen: Start,
    navigationOptions: { header: null }
  },
  DrawerNavi: {
    screen: Drawer,
    navigationOptions: { header: null }
  }
});

export default createAppContainer(MainStack);
