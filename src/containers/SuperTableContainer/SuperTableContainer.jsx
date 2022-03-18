import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getDataAction } from '../../store/superTable'
import Header from './SuperTableHeader'
import Status from './SuperTableStatus'
import Footer from './SuperTableFooter'
import Table from './SuperTable'
import './SuperTableContainer.scss'

const SuperTableContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataAction())
  }, [])

  return (
    <div className="SuperTableContainer">
      <Header />
      <Status />
      <Table />
      <Footer />
    </div>
  )
}

export default SuperTableContainer
