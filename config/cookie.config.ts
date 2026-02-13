
export const cookieConfig = {
  accessToken: {
    name: "accessToken",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    },
  },

  refreshToken: {
    name: "refreshToken",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    },
  },
}
