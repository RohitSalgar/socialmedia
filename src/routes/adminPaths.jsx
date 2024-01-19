import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const InternalUserLayoutComponent = lazy(() =>
	import("../components/AdminLayout/index")
);

const LoginPage = lazy(() => import("../view/User/Public/Login/index"))



const operationAdminPaths = [
	{
		path: "/admin",
		element: InternalUserLayoutComponent,
		children: [
			{
				path: "schedules",
				element: LoginPage,
			}
		],
	},
];

export default function OperationAdminApp() {
	return (
		<Routes>
			{operationAdminPaths.map((parentElement, index) => (
				<Route
					key={index}
					path={parentElement.path}
					element={<parentElement.element />}>
					{parentElement.children.map((element, index) => (
						<Route
							key={index}
							path={element.path}
							element={
								<Suspense fallback={<div>Loading ...</div>}>
									<element.element />
								</Suspense>
							}
						/>
					))}
				</Route>
			))}
			<Route
				path="*"
				element={<Navigate to="/admin/schedules" replace />}
			/>
		</Routes>
	);
}
