// WARNING: This file is generated using ToReducer.xsl. Changes made here may be lost.
import LocalizedStrings from 'react-localization';
import { FETCH_LOCALIZATION, SET_LANGUAGE } from './types';
import { ILocalizedStrings } from './model';

const initialState = {
	"loaded": false,
	"lang": 'en',
	"access": new LocalizedStrings({
		"en": {
			"silTranscriberAccess": "SIL Transcriber Access",
			"accessSilTranscriber": "Access SIL Transcriber",
			"createAccount": "Create an Account",
			"accessExistingAccount": "Access with existing Account",
		}
	}),
	"snackbar": new LocalizedStrings({
		"en": {
			"undo": "UNDO",
		}
	}),
	"usertable": new LocalizedStrings({
		"en": {
			"silTranscriberAdmin": "SIL Transcriber Admin",
			"chooseUser": "Choose User",
			"name": "Name",
			"email": "Email",
			"locale": "Locale",
			"phone": "Phone",
			"timezone": "Timezone",
			"cancel": "Cancel",
			"continue": "Continue",
			"role": "Role",
			"invite": "Invite",
			"action": "Action",
			"delete": "Delete",
			"filter": "Filter",
			"selectRows": "Please select row(s) to {0}.",
		}
	}),
	"alert": new LocalizedStrings({
		"en": {
			"confirmation": "Confirmation",
			"areYouSure": "Are you sure?",
			"no": "No",
			"yes": "Yes",
		}
	}),
	"projectTable": new LocalizedStrings({
		"en": {
			"silTranscriberAdmin": "SIL Transcriber Admin",
			"chooseProject": "Choose Project",
			"name": "Name",
			"description": "Description",
			"language": "Language",
			"delete": "Delete",
		}
	}),
	"chart": new LocalizedStrings({
		"en": {
			"passagesCompleted": "Passages Completed",
			"totalTransactions": "Total Transactions",
		}
	}),
	"projectSettings": new LocalizedStrings({
		"en": {
			"general": "General",
			"name": "Name",
			"description": "Description",
			"projectType": "Project Type",
			"selectProjectType": "Please select your project type",
			"language": "Language",
			"transcriptionLanguage": "Transcription Language",
			"preferredLanguageName": "Preferred Language Name",
			"uiLanguagInUserProfile": "(User interface languages are set in the user profile.)",
			"textEditor": "Text Editor",
			"defaultFont": "Default Font",
			"selectDefaultFont": "Please select the preferred default font",
			"needFont": "Need Font",
			"addMissingFont": "Can't find the font you need?",
			"defaultFontSize": "Default Font Size",
			"selectFontSize": "Please select the default font size",
			"rightToLeft": "Right to left?",
			"add": "Add",
			"dangerZone": "Danger Zone",
			"deleteProject": "Delete this Project",
			"deleteExplained": "All plans, sections, passages, and media files will be removed.",
			"delete": "DELETE",
			"save": "Save",
			"group": "Group",
			"preview": "Preview",
			"selectProjectGroup": "Select project group. Each project relates to a single group. Group members can work on the project.",
		}
	}),
	"planTable": new LocalizedStrings({
		"en": {
			"addPlan": "Add Plan",
			"name": "Name",
			"type": "Type",
			"sections": "Sections",
			"taks": "Passages",
			"action": "Action",
			"silTranscriberAdmin": "SIL Transcriber Admin",
			"choosePlan": "Choose a Project Plan",
		}
	}),
	"planSheet": new LocalizedStrings({
		"en": {
			"action": "Action",
			"delete": "Delete",
			"move": "Move",
			"copy": "Copy",
			"attachMedia": "Attach Media",
			"addSection": "Add Section",
			"addPassage": "Add Passage",
			"save": "Save",
			"saving": "Saving",
			"selectRows": "Please select row(s) to {0}.",
		}
	}),
	"scriptureTable": new LocalizedStrings({
		"en": {
			"section": "Section",
			"title": "Title",
			"passage": "Passage",
			"book": "Book",
			"reference": "Reference",
			"description": "Description",
		}
	}),
	"assignmentTable": new LocalizedStrings({
		"en": {
			"title": "Assignments",
			"section": "Section",
			"sectionstate": "State",
			"passages": "Passages",
			"passagestate": "State",
			"user": "User",
			"role": "Role",
			"assignSec": "Assign Section",
			"removeSec": "Remove Assignment",
			"delete": "Delete",
			"filter": "Filter",
			"group": "Group",
			"transcriber": "Transcriber",
			"reviewer": "Reviewer",
			"selectRowsToAssign": "Please select row(s) to assign.",
			"selectRowsToRemove": "Please select row(s) to remove assignment.",
		}
	}),
	"assignSection": new LocalizedStrings({
		"en": {
			"title": "Assign sections to Users",
			"sections": "Sections",
			"users": "Users",
			"reviewer": "Reviewer",
			"transcriber": "Transcriber",
			"role": "Role",
			"assignAs": "Assign As",
			"close": "Close",
		}
	}),
	"planTabs": new LocalizedStrings({
		"en": {
			"sectionsPassages": "Sections & Passages",
			"media": "Media",
			"assignments": "Assignments",
			"transcriptions": "Transcriptions",
		}
	}),
	"planAdd": new LocalizedStrings({
		"en": {
			"name": "Name",
			"addPlan": "Add a Plan",
			"newPlanTask": "Enter information for a new plan. (It could be a book of the Bible to be transcribed, a story, a lexionary, and so on.)",
			"planType": "Type",
			"selectPlanType": "Select plan type.",
			"cancel": "Cancel",
			"add": "Add",
			"save": "Save",
			"newPlan": "New Plan",
			"selectAPlanType": "Please select a plan type",
			"editPlan": "Edit Plan Details",
		}
	}),
	"mediaTab": new LocalizedStrings({
		"en": {
			"action": "Action",
			"delete": "Delete",
			"download": "Download",
			"changeVersion": "Change Version",
			"attachPassage": "Attach Passage",
			"uploadMedia": "Upload Media",
			"uploadComplete": "Upload complete.",
			"planName": "Plan",
			"fileName": "File Name",
			"sectionId": "Section Id",
			"sectionName": "Section Name",
			"book": "Book",
			"reference": "Reference",
			"duration": "Length (s)",
			"size": "Size (KB)",
			"version": "Version",
			"section": "Section",
			"date": "Date",
			"filter": "Filter",
			"selectFiles": "Please select files to be uploaded.",
			"selectRows": "Please select row(s) to {0}.",
		}
	}),
	"passageMedia": new LocalizedStrings({
		"en": {
			"attachAvailableMedia": "Attach available media files to passages (with no current media).",
			"attachMediaToPassages": "Attach Media to Passages",
			"choosePassage": "Choose Your Passage ({0} without attachments)",
			"availableMedia": "Available Media ({0})",
			"attachments": "Attachments ({0}) Select if you want to detach the media from the passage.",
			"close": "Close",
		}
	}),
	"main": new LocalizedStrings({
		"en": {
			"silTranscriberAdmin": "SIL Transcriber Admin",
			"search": "Search…",
			"organization": "Org Details",
			"usersAndGroups": "Users and Groups",
			"passages": "Passages",
			"media": "Media",
			"plans": "Plans",
			"team": "Team",
			"settings": "Settings",
			"integrations": "Integrations",
			"project": "Project",
			"loadingTranscriber": "Loading SIL Transcriber Admin",
			"projectSummary": "Project Summary",
			"addProject": "Add Project",
			"logout": "Log Out",
			"myAccount": "My Account",
			"clearCache": "Clear cache",
			"planUnsaved": "Plan Unsaved",
			"loseData": "Do you want to leave this page and lose your changes?",
			"newOrganization": "Add Organization",
		}
	}),
	"transcriptionTab": new LocalizedStrings({
		"en": {
			"section": "Section",
			"sectionstate": "State",
			"passages": "Passages",
			"filter": "Filter",
			"group": "Group",
			"transcriber": "Transcriber",
			"reviewer": "Reviewer",
		}
	}),
	"transcriptionShow": new LocalizedStrings({
		"en": {
			"transcription": "Transcription",
			"transcriptionDisplay": "This display allows you to review the transcription that is stored.",
			"close": "Close",
		}
	}),
	"groupTabs": new LocalizedStrings({
		"en": {
			"users": "Users",
			"groups": "Groups",
			"invitations": "Invitations",
		}
	}),
	"groupTable": new LocalizedStrings({
		"en": {
			"name": "Name",
			"abbr": "Abbreviation",
			"owner": "Owner",
			"projects": "Projects",
			"members": "Members",
			"filter": "Filter",
			"action": "Action",
			"delete": "Delete",
			"addGroup": "Add Group",
			"selectRows": "Please select row(s) to {0}.",
		}
	}),
	"groupAdd": new LocalizedStrings({
		"en": {
			"newGroup": "New Group",
			"cancel": "Cancel",
			"add": "Add",
			"save": "Save",
			"editGroup": "Edit Group",
			"addGroup": "Add Group",
			"newGroupTask": "Enter (or edit) basic group information.",
			"name": "Name",
			"abbr": "Abbreviation",
		}
	}),
	"groupSettings": new LocalizedStrings({
		"en": {
			"name": "Name",
			"abbreviation": "Abbreviation",
			"save": "Save",
			"projects": "Projects",
			"reviewers": "Reviewers",
			"transcribers": "Transcribers",
			"addGroupMember": "Add Group Member",
			"addMemberInstruction": "Enter the name of a person in the organization to be included in the group.",
			"cancel": "Cancel",
			"add": "Add",
			"delete": "Delete",
			"allReviewersCanTranscribe": "All Reviewers are allowed to transcribe.",
			"noProjects": "There are no projects that use this group.",
			"assignedSections": "  Assigned Sections: ",
			"projectPlans": "Project Plans",
			"invalidRole": "Invalid Role. User not added.",
		}
	}),
	"shapingTable": new LocalizedStrings({
		"en": {
			"NoColumns": "No columns visible",
		}
	}),
	"treeChart": new LocalizedStrings({
		"en": {
			"noData": "No Transcription Data Yet",
		}
	}),
	"languagePicker": new LocalizedStrings({
		"en": {
			"font": "Font",
			"script": "Script",
			"language": "Language",
			"selectLanguage": "Select a Language",
			"findALanguage": "Find a language by name, code, or country",
			"codeExplained": "Code Explained",
			"subtags": "Subtags",
			"details": "Details",
			"languageOf": "A Language of $1$2.",
			"inScript": " in the $1 script",
			"select": "Select",
			"cancel": "Cancel",
		}
	}),
	"activityState": new LocalizedStrings({
		"en": {
			"noMedia": "No Media",
			"transcribeReady": "Ready For Transcription",
			"transcribing": "Transcribing",
			"needsNewRecording": "Recording Problem",
			"transcribed": "Transcribed",
			"reviewing": "Reviewing",
			"needsNewTranscription": "Needs Changes",
			"approved": "Approved (not synced)",
			"synced": "Synced",
			"done": "Done",
		}
	}),
	"invite": new LocalizedStrings({
		"en": {
			"editInvite": "Edit Invite",
			"addInvite": "Invite User",
			"newInviteTask": "Enter the email address of the user to invite.",
			"email": "Email",
			"role": "Role",
			"selectRole": "Select Organizational Role",
			"cancel": "Cancel",
			"add": "Add",
			"save": "Save",
			"invalidEmail": "Invalid email address",
			"alreadyInvited": "Already invited!",
		}
	}),
	"invitationTable": new LocalizedStrings({
		"en": {
			"email": "Email",
			"role": "Role",
			"accepted": "Accepted",
			"invite": "Invite",
			"action": "Action",
			"delete": "Delete",
			"filter": "Filter",
			"selectRows": "Please select row(s) to {0}.",
		}
	}),
	"orgSettings": new LocalizedStrings({
		"en": {
			"add": "Add",
			"name": "Name",
			"description": "Description",
			"website": "Website",
			"logo": "Logo",
			"publicByDefault": "Public By Default",
			"save": "Save",
		}
	}),
};

export default function (state = initialState, action: any): ILocalizedStrings {
	switch (action.type) {
		case FETCH_LOCALIZATION:
			return {
				...state,
				"loaded": true,
				"access" : new LocalizedStrings(action.payload.data.access),
				"snackbar" : new LocalizedStrings(action.payload.data.snackbar),
				"usertable" : new LocalizedStrings(action.payload.data.usertable),
				"alert" : new LocalizedStrings(action.payload.data.alert),
				"projectTable" : new LocalizedStrings(action.payload.data.projectTable),
				"chart" : new LocalizedStrings(action.payload.data.chart),
				"projectSettings" : new LocalizedStrings(action.payload.data.projectSettings),
				"planTable" : new LocalizedStrings(action.payload.data.planTable),
				"planSheet" : new LocalizedStrings(action.payload.data.planSheet),
				"scriptureTable" : new LocalizedStrings(action.payload.data.scriptureTable),
				"assignmentTable" : new LocalizedStrings(action.payload.data.assignmentTable),
				"assignSection" : new LocalizedStrings(action.payload.data.assignSection),
				"planTabs" : new LocalizedStrings(action.payload.data.planTabs),
				"planAdd" : new LocalizedStrings(action.payload.data.planAdd),
				"mediaTab" : new LocalizedStrings(action.payload.data.mediaTab),
				"passageMedia" : new LocalizedStrings(action.payload.data.passageMedia),
				"main" : new LocalizedStrings(action.payload.data.main),
				"transcriptionTab" : new LocalizedStrings(action.payload.data.transcriptionTab),
				"transcriptionShow" : new LocalizedStrings(action.payload.data.transcriptionShow),
				"groupTabs" : new LocalizedStrings(action.payload.data.groupTabs),
				"groupTable" : new LocalizedStrings(action.payload.data.groupTable),
				"groupAdd" : new LocalizedStrings(action.payload.data.groupAdd),
				"groupSettings" : new LocalizedStrings(action.payload.data.groupSettings),
				"shapingTable" : new LocalizedStrings(action.payload.data.shapingTable),
				"treeChart" : new LocalizedStrings(action.payload.data.treeChart),
				"languagePicker" : new LocalizedStrings(action.payload.data.languagePicker),
				"activityState" : new LocalizedStrings(action.payload.data.activityState),
				"invite" : new LocalizedStrings(action.payload.data.invite),
				"invitationTable" : new LocalizedStrings(action.payload.data.invitationTable),
				"orgSettings" : new LocalizedStrings(action.payload.data.orgSettings),
			};
		case SET_LANGUAGE:
			return {
				...state,
				lang: action.payload,
			};
		default:
			return state;
	}
}
