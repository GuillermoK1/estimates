export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, { user })
    return sendRedirect(event, '/logged-in')
  }
})
