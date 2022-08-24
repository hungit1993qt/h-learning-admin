//tsrfce
import { Outlet } from 'react-router-dom'
import HeaderHome from '../Components/HeaderHome/HeaderHome'
import '_Playground/SCSS/index.scss'



type Props = {}

function HomeTemplate({}: Props) {
  return (
    <div>
        <HeaderHome />
        <Outlet />
    </div>
  )
}

export default HomeTemplate