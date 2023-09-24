import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Stats from "./Stats";
import PackingList from "./PackingList";

const App = () => {
    const [items, setItems] = useState([]);

    const handleAddItem = (item) => {
        setItems((currentItems) => {
            console.log([...currentItems, { ...item }]);
            return [...currentItems, { ...item }];
        });
    };

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    const handleDeleteItem = (id) => {
        setItems((currentItems) =>
            currentItems.filter((item) => item.id !== id)
        );
    };

    return (
        <section className="app">
            <Logo />
            <Form onAddItem={handleAddItem} />
            <PackingList
                items={items}
                onDeleteAllItem={setItems}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
            />
            <Stats items={items} />
        </section>
    );
};

export default App;
