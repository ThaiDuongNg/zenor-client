
import { TypeAccount } from "../interfaces"

const personal = [
  {
    name : 'last_name',
    title: 'Họ'
  },
  {
    name: 'first_name',
    title: 'Tên'
  },
  {
    name: 'email',
    title: 'email',
  },
  {
    name: 'password',
    title: 'Nhập mật khẩu ',
    type: 'password'
  },
  {
    name: 're_password',
    title: 'Nhập lại mật khẩu',
    type: 'password'
  }
]

const smes = [{
  name: 'organization_name',
  title: 'Tên tổ chức'
}, ...personal]

const corporate = [{
  name: 'organization_id',
  title: 'Mã số doanh nghiệp'
}, ...smes]

export {personal, smes, corporate}