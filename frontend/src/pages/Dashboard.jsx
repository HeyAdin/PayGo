import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { SearchBar } from "../components/SearchBar";
import { Users } from "../components/Users";

export function Dashboard(){
    return <div className="h-screen w-screen bg-[#0A2B24]">
        <AppBar user={"Adin"} />
        <Balance balance={"$5000"}/>
        <SearchBar />
        <Users />
    </div>
}