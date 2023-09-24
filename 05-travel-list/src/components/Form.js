import { useState } from "react";

const Form = ({ onAddItem }) => {
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!description || !quantity) {
            return;
        }

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };

        onAddItem(newItem);

        setQuantity(1);
        setDescription("");
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const onQuantityChange = (event) => {
        setQuantity(Number.parseInt(event.target.value));
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip 😍</h3>
            <select onChange={onQuantityChange} value={quantity}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={handleDescriptionChange}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default Form;
