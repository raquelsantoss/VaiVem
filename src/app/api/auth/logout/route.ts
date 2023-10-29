import { NextResponse } from "next/server";

export async function GET(){
    const response = NextResponse.json({
        message: "Logout feito com sucesso",
    });

    // Remove the cookie
    response.cookies.delete("token");
    return response;
}