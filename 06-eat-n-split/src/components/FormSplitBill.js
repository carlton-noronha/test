import Button from "./Button";
import { useState } from "react";

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
    const [bill, setBill] = useState("");
    const [paidByUser, setPaidByUser] = useState("");
    const paidByFriend = bill ? bill - paidByUser : "";
    const [whoIsPaying, setWhoIsPaying] = useState("user");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bill || !paidByUser) {
            return;
        }
        onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
    };

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>💰 Bill value</label>
            <input
                type="text"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
            />

            <label>🕺🏼 Your expense</label>
            <input
                type="text"
                value={paidByUser}
                onChange={(e) =>
                    setPaidByUser(
                        Number(e.target.value) > bill
                            ? paidByUser
                            : Number(e.target.value)
                    )
                }
            />

            <label>👨🏾‍🤝‍👨🏼 {selectedFriend.name}'s expense</label>
            <input type="text" value={paidByFriend} disabled />

            <label>🤑 Who is paying the bill</label>
            <select
                value={whoIsPaying}
                onChange={(e) => setWhoIsPaying(e.target.value)}
            >
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>
            <Button type="submit">Split bill</Button>
        </form>
    );
};

export default FormSplitBill;
