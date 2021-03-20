import { ApiFactory } from 'src/common/api/apiFactory'
const EmailService = ApiFactory.get('email')

export default {
  async sendMail ({ commit }, email) {
    const { data } = await EmailService.post(email)
    return data
  }
}
