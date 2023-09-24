const Stats = ({ items }) => {
    if (items.length === 0) {
        return (
            <p className="stats">
                <em>Start adding some items to your list 🚀</em>
            </p>
        );
    }

    const numOfItems = items.length;
    const numOfItemsPacked = items.filter((item) => item.packed).length;
    const percentageOfPackedItems = Math.round(
        (numOfItemsPacked / numOfItems) * 100
    );

    return (
        <footer className="stats">
            <em>
                {percentageOfPackedItems === 100
                    ? "You got everything! Ready to go go ✈"
                    : `💼 You have ${numOfItems} items on your list and you have already
                packed ${numOfItemsPacked} (${percentageOfPackedItems}%)`}
            </em>
        </footer>
    );
};

export default Stats;
