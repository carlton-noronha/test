import { useState } from "react";
import Item from "./Item";

const PackingList = ({
    items,
    onDeleteItem,
    onToggleItem,
    onDeleteAllItem,
}) => {
    const [sortBy, setSortBy] = useState("input");
    let sortedItems;

    if (sortBy === "input") {
        sortedItems = items;
    }

    if (sortBy === "packed") {
        sortedItems = items
            .slice()
            .sort(
                (item1, item2) => Number(item1.packed) - Number(item2.packed)
            );
    }

    if (sortBy === "description") {
        sortedItems = items
            .slice()
            .sort((item1, item2) =>
                item1.description.localeCompare(item2.description)
            );
    }
    return (
        <section className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onToggleItem={onToggleItem}
                    />
                ))}
            </ul>
            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button
                    onClick={() => {
                        const confirm = window.confirm(
                            "Confirm deletion of all items in the list?"
                        );
                        confirm && onDeleteAllItem([]);
                    }}
                >
                    Clear list
                </button>
            </div>
        </section>
    );
};

export default PackingList;
