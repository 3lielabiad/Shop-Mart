import { NextRequest, NextResponse } from "next/server"


const users =[
    {
        id: 1,
        name: 'ahmed ali',
        email: 'ahmed@gmail.com'
    }
]


export async function GET() {


    return NextResponse.json(users)
}
export async function Post(req : NextRequest) {

    const user = await req.json()
        
        users.push(user)

        return NextResponse.json({
            message: 'success',
            users
        })
    
}