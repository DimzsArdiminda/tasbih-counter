// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tasbih/:path*"
  ],
};
