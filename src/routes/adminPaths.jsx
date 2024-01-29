import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import posts from "../view/Admin/posts";
import Advertisement from "../view/Admin/advertisement";

const InternalUserLayoutComponent = lazy(() =>
	import("../components/AdminLayout/index")
);

const users = lazy(() => import("../view/Admin/users/index"))
const pages = lazy(() => import("../view/Admin/pages/index"))
const schedules = lazy(() => import("../view/Admin/schedules/index"))


const AdminPaths = [
	{
		path: "/admin",
		element: InternalUserLayoutComponent,
		children: [
			{
				path: "users",
				element: users,
			},
			{
				path: "pages",
				element: pages,
			},
			{
				path: "schedules",
				element: schedules,
			},
			{
				path: "posts",
				element: posts,
			},
			{
				path: "advertisements",
				element: Advertisement,
			}
		],
	},
];

export default function AdminApp() {
	return (
		<Routes>
			{AdminPaths.map((parentElement, index) => (
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
				element={<Navigate to="/admin/users" replace />}
			/>
		</Routes>
	);
}
