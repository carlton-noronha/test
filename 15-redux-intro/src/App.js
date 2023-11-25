import { useSelector } from "react-redux";
import CreateCustomer from "./CreateCustomer";
import Customer from "./Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/customers/BalanceDisplay";

function App() {
  const customerName = useSelector((state) => state.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {customerName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
