import { Link } from "react-router-dom"
export function AdminSideBar(){
    return(
        <>
        <div className="sidebar">
            <h4>All MASTERS</h4>
        <ul>
            <li>
                <Link to={'/admin/user'}>
                Users
                </Link>
                </li>
            <li>
                <Link to={'/admin/page'}>
                Pages
                </Link>
                </li>
            <li>
                <Link>
                Reported Posts
                </Link>
                </li>
        </ul>
        </div>
        </>
    )
}