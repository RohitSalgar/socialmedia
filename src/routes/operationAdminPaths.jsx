// import { lazy, Suspense } from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Loader from "../components/Loader/Loader";

// const countryComponent = lazy(() =>
// 	import("../views/Internals/Country/Country")
// );

// const laneComponent = lazy(() =>
// 	import("../views/Internals/InternalUsers/index")
// );

// const costHeadingComponent = lazy(() =>
// 	import("../views/Internals/CostHeading/CostHeading")
// );

// const scheduleComponent = lazy(() =>
// 	import("../views/Internals/Schedules/Schedules")
// );
// const rateListComponent = lazy(() =>
// 	import("../views/Internals/Ratelist/index")
// );
// const rateViewComponent = lazy(() =>
// 	import("../views/Internals/RateView/ViewPage")
// );
// const bookingComponent = lazy(() =>
// 	import("../views/Internals/BookingManagement/index")
// );

// const auditLogComponent = lazy(() =>
// 	import("../views/Internals/AuditLog/AuditLog")
// );

// const InternalUserLayoutComponent = lazy(() =>
// 	import("../components/InternalUserLayout/InternalUserLayout")
// );

// const FullUserListComponent = lazy(() =>
// 	import("../views/Internals/UserManagement/AllUsers/index")
// );

// const AcceptedUserListComponent = lazy(() =>
// 	import("../views/Internals/UserManagement/AcceptedUsers/index")
// );

// const NewUserListComponent = lazy(() =>
// 	import("../views/Internals/UserManagement/NewUsers/index")
// );

// const RejectedUserListComponent = lazy(() =>
// 	import("../views/Internals/UserManagement/RejectedUsers/index")
// );

// const RevalidatedUserListComponent = lazy(() =>
// 	import("../views/Internals/UserManagement/RevalidatedUsers/index")
// );
// const DeactivatedListComponent = lazy(() =>
// 	import("../views/Internals/UserManagement/DeactivetedUsers/index")
// );

// const TeamDetailsComponent = lazy(() =>
// 	import("../views/Internals/TeamDetails/Subuser")
// );

// const PortHoliday = lazy(() => import("../views/Internals/PortHoliday/index"));

// const CfsListComponent = lazy(() =>
// 	import("../views/Internals/CFSManagement/CFS/index")
// );
// const CfsSubUserComponent = lazy(() =>
// 	import("../views/Internals/CFSManagement/CfsTeamDetails/index")
// );
// const BookingListComponent = lazy(() =>
// 	import("../views/Internals/BookingManagementList/index")
// );

// const BookingViewComponent = lazy(() =>
// 	import("../views/Internals/BookingView/index")
// );

// const PreBookingViewComponent = lazy(() =>
// 	import("../views/Internals/PreBookingView")
// );

// const PlaceOrderViewComponent = lazy(() =>
// 	import("../views/Internals/PlaceOrderView/index")
// );

// const ChangePassword = lazy(() => import("../views/Internals/ChangePassword"));

// const TermsConditionComponent = lazy(() =>
// 	import("../views/Common/TermsAndConditions/index")
// );

// const AboutVersion = lazy(() =>
// 	import("../views/Internals/AboutVersion/index")
// );

// const feedbackmanagementComponent = lazy(() =>
// 	import("../views/Internals/FeedbackManagement/index")
// );
// const rolemanagementComponent = lazy(() =>
// 	import("../views/Internals/RoleManagement/index")
// );
// const addRoleComponent = lazy(() =>
// 	import("../views/Internals/RoleManagement/AddRole")
// );
// const InternalUsersComponent = lazy(() =>
// 	import("../views/Internals/InternalUsers/index")
// );

// const operationAdminPaths = [
// 	{
// 		path: "/admin",
// 		element: InternalUserLayoutComponent,
// 		children: [
// 			{
// 				path: "about",
// 				element: AboutVersion,
// 			},
// 			{
// 				path: "country",
// 				element: countryComponent,
// 			},
// 			{
// 				path: "lane",
// 				element: laneComponent,
// 			},
// 			{
// 				path: "costheading",
// 				element: costHeadingComponent,
// 			},
// 			{
// 				path: "rate",
// 				element: rateListComponent,
// 			},
// 			{
// 				path: "booking",
// 				element: bookingComponent,
// 			},
// 			{
// 				path: "auditLog",
// 				element: auditLogComponent,
// 			},
// 			{
// 				path: "booking/:scheduleId/:bookingId",
// 				element: BookingViewComponent,
// 			},
// 			{
// 				path: "prebooking/:scheduleId/:bookingId",
// 				element: PreBookingViewComponent,
// 			},
// 			{
// 				path: "placeorder/:id/:scheduleId",
// 				element: PlaceOrderViewComponent,
// 			},
// 			{
// 				path: "bookinglist/:id",
// 				element: BookingListComponent,
// 			},
// 			{
// 				path: "rate/:id",
// 				element: rateViewComponent,
// 			},
// 			{
// 				path: "schedules",
// 				element: scheduleComponent,
// 			},
// 			{
// 				path: "holidays",
// 				element: PortHoliday,
// 			},
// 			{
// 				path: "newuser",
// 				element: NewUserListComponent,
// 			},
// 			{
// 				path: "accepteduser",
// 				element: AcceptedUserListComponent,
// 			},
// 			{
// 				path: "rejecteduser",
// 				element: RejectedUserListComponent,
// 			},
// 			{
// 				path: "revalidateduser",
// 				element: RevalidatedUserListComponent,
// 			},
// 			{
// 				path: "deactivateduser",
// 				element: DeactivatedListComponent,
// 			},
// 			{
// 				path: "users",
// 				element: FullUserListComponent,
// 			},
// 			{
// 				path: "users/:id",
// 				element: TeamDetailsComponent,
// 			},
// 			{
// 				path: "cfsmanagement",
// 				element: CfsListComponent,
// 			},
// 			{
// 				path: "cfsmanagement/:id",
// 				element: CfsSubUserComponent,
// 			},
// 			{
// 				path: "changepassword",
// 				element: ChangePassword,
// 			},
// 			{
// 				path: "termsconditons",
// 				element: TermsConditionComponent,
// 			},
// 			{
// 				path: "feedbackmanagement",
// 				element: feedbackmanagementComponent,
// 			},
// 			{
// 				path: "role",
// 				element: rolemanagementComponent,
// 			},
// 			{
// 				path: "role/addRole",
// 				element: addRoleComponent,
// 			},
// 			{
// 				path: "role/:id",
// 				element: addRoleComponent,
// 			},
// 			{
// 				path: "internalUser",
// 				element: InternalUsersComponent,
// 			},
// 		],
// 	},
// ];

// export default function OperationAdminApp() {
// 	return (
// 		<Routes>
// 			{operationAdminPaths.map((parentElement, index) => (
// 				<Route
// 					key={index}
// 					path={parentElement.path}
// 					element={<parentElement.element />}>
// 					{parentElement.children.map((element, index) => (
// 						<Route
// 							key={index}
// 							path={element.path}
// 							element={
// 								<Suspense fallback={<Loader />}>
// 									<element.element />
// 								</Suspense>
// 							}
// 						/>
// 					))}
// 				</Route>
// 			))}
// 			<Route
// 				path="*"
// 				element={<Navigate to="/admin/country" replace />}
// 			/>
// 		</Routes>
// 	);
// }
