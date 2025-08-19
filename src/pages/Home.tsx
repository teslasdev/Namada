import { useState, useEffect } from "react";
import ClientDashboard from "../components/ShieldedPool";

const GovernanceDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "parameters" | "proposals" | "validator" | "charts"
  >("parameters");
  const [darkMode, setDarkMode] = useState(false);
  const [paramsData, setParamsData] = useState<any>(null);
  const [propsData, setPropsData] = useState<any>(null);
  const [validatorData, setValidatorData] = useState<any>(null);
  const [loading, setLoading] = useState({
    params: true,
    props: true,
    validator: true,
  });
  const [error, setError] = useState<{
    params: string | null;
    props: string | null;
    validator: string | null;
  }>({ params: null, props: null, validator: null });

  useEffect(() => {
    // Check for user's preferred color scheme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);

    // Fetch Parameters Data
    const fetchParams = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/ZecHub/zechub-wiki/main/public/data/namada/protocol_parameters.json"
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData = await response.json();
        setParamsData(jsonData[0]);
      } catch (err) {
        setError((prev) => ({
          ...prev,
          params:
            err instanceof Error ? err.message : "An unknown error occurred",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, params: false }));
      }
    };

    // Fetch Proposals Data
    const fetchProps = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/ZecHub/zechub-wiki/main/public/data/namada/props.json"
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData = await response.json();
        setPropsData(jsonData[0]);
      } catch (err) {
        setError((prev) => ({
          ...prev,
          props:
            err instanceof Error ? err.message : "An unknown error occurred",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, props: false }));
      }
    };

    // Fetch Validator Data
    const fetchValidator = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/ZecHub/zechub-wiki/main/public/data/namada/zechub.json"
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData = await response.json();
        setValidatorData(jsonData[0]);
      } catch (err) {
        setError((prev) => ({
          ...prev,
          validator:
            err instanceof Error ? err.message : "An unknown error occurred",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, validator: false }));
      }
    };

    fetchParams();
    fetchProps();
    fetchValidator();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading.params && loading.props) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-background" : "bg-background"
      }`}
    >
      <div className="min-h-screen text-foreground">
        {/* Header Section */}
        <header className="bg-card shadow-sm transition-theme fixed w-[100vw] z-[99]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-foreground">
                  Namada Governance Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full transition-all duration-150 ${
                    darkMode
                      ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <span className="w-5 h-5 block">☀️</span>
                  ) : (
                    <span className="w-5 h-5 block">🌙</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-[68px]">
          {/* Tabs Navigation */}
          <div className="border-b border-border mb-6 transition-theme">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("parameters")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "parameters"
                    ? "text-blue-400 border-blue-400"
                    : `border-transparent ${
                        darkMode
                          ? "hover:border-gray-300 text-gray-400 hover:text-gray-300"
                          : "hover:border-gray-300 text-gray-600 hover:text-gray-700"
                      }`
                }`}
              >
                Protocol Parameters
              </button>
              <button
                onClick={() => setActiveTab("proposals")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "proposals"
                    ? "text-blue-400 border-blue-400"
                    : `border-transparent ${
                        darkMode
                          ? "hover:border-gray-300 text-gray-400 hover:text-gray-300"
                          : "hover:border-gray-300 text-gray-600 hover:text-gray-700"
                      }`
                }`}
              >
                Governance Proposals
              </button>
              <button
                onClick={() => setActiveTab("validator")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "validator"
                    ? "text-blue-400 border-blue-400"
                    : `border-transparent ${
                        darkMode
                          ? "hover:border-gray-300 text-gray-400 hover:text-gray-300"
                          : "hover:border-gray-300 text-gray-600 hover:text-gray-700"
                      }`
                }`}
              >
                Validator
              </button>
              <button
                onClick={() => setActiveTab("charts")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "charts"
                    ? "text-blue-400 border-blue-400"
                    : `border-transparent ${
                        darkMode
                          ? "hover:border-gray-300 text-gray-400 hover:text-gray-300"
                          : "hover:border-gray-300 text-gray-600 hover:text-gray-700"
                      }`
                }`}
              >
                Charts
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "parameters" ? (
            <ParametersTab
              data={paramsData}
              loading={loading.params}
              error={error.params}
              darkMode={darkMode}
            />
          ) : activeTab === "proposals" ? (
            <ProposalsTab
              data={propsData}
              loading={loading.props}
              error={error.props}
              darkMode={darkMode}
            />
          ) : activeTab === "validator" ? (
            <ValidatorTab
              data={validatorData}
              loading={loading.validator}
              error={error.validator}
              darkMode={darkMode}
            />
          ) : (
            <ClientDashboard />
          )}
        </main>
      </div>
    </div>
  );
};

const ParametersTab = ({ data, loading, error, darkMode }: any) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`p-4 rounded-lg ${
          darkMode ? "bg-gray-800 text-red-400" : "bg-white text-red-600"
        }`}
      >
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Governance Parameters Grid */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Governance Parameters Card */}
        <div
          className={`rounded-lg shadow overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className={`px-6 py-4 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2
              className={`text-lg font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Governance Parameters
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              {Object.entries(data.Governance_Parameters[0]).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {key.replace(/_/g, " ")}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {typeof value === "number"
                        ? value.toLocaleString()
                        : String(value)}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Public Goods Funding Card */}
        <div
          className={`rounded-lg shadow overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className={`px-6 py-4 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2
              className={`text-lg font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Public Goods Funding
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              {Object.entries(data.Public_Goods_Funding_Parameters[0]).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {key.replace(/_/g, " ")}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {typeof value === "number" ? `${value}` : String(value)}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Protocol Parameters Card */}
        <div
          className={`rounded-lg shadow overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className={`px-6 py-4 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2
              className={`text-lg font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Protocol Parameters
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              {Object.entries(data.Protocol_Parameters[0])
                .filter(
                  ([key]) =>
                    ![
                      "VP_allowlist",
                      "Transactions_allowlist",
                      "Protocol_Parameters",
                      "Implicit_VP_hash",
                    ].includes(key)
                )
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {key.replace(/_/g, " ")}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {typeof value === "boolean"
                        ? value
                          ? "Yes"
                          : "No"
                        : String(value)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Proof of Stake Card */}
        <div
          className={`rounded-lg shadow overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className={`px-6 py-4 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2
              className={`text-lg font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Proof of Stake
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              {Object.entries(data.Proof_Of_Stake_Parmeters[0]).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {key.replace(/_/g, " ")}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {typeof value === "number" && key.includes("rate")
                        ? `${value * 100}%`
                        : String(value)}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Allowlists Section */}
      <div
        className={`rounded-lg shadow overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div
          className={`px-6 py-4 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Allowlists
          </h2>
        </div>
        <div className="px-6 py-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* VP Allowlist */}
            <div>
              <h3
                className={`text-md font-medium mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                VP Allowlist
              </h3>
              <div
                className={`p-4 rounded-md max-h-60 overflow-y-auto ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                {data.Protocol_Parameters[0].VP_allowlist.map(
                  (hash: string, i: number) => (
                    <div
                      key={i}
                      className={`text-xs font-mono mb-1 break-all ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {hash}
                    </div>
                  )
                )}
              </div>
              <h3
                className={`text-md font-medium mt-6 mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Implicit VP hash
              </h3>
              <div
                className={`p-4 rounded-md max-h-60 overflow-y-auto ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div
                  className={`text-xs font-mono mb-1 break-all ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {data.Protocol_Parameters[0].Implicit_VP_hash}
                </div>
              </div>
            </div>

            {/* Transactions Allowlist */}
            <div>
              <h3
                className={`text-md font-medium mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Transactions Allowlist
              </h3>
              <div
                className={`p-4 rounded-md max-h-60 overflow-y-auto ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                {data.Protocol_Parameters[0].Transactions_allowlist.map(
                  (hash: string, i: number) => (
                    <div
                      key={i}
                      className={`text-xs font-mono mb-1 break-all ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {hash}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProposalsTab = ({ data, loading, error, darkMode }: any) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`p-4 rounded-lg ${
          darkMode ? "bg-gray-800 text-red-400" : "bg-white text-red-600"
        }`}
      >
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Current Epoch */}
      <div
        className={`rounded-lg shadow px-6 py-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-lg font-semibold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Current Epoch:{" "}
          <span className="font-bold">{data.Last_committed_epoch}</span>
        </h2>
      </div>

      {/* Proposals Table */}
      <div
        className={`rounded-lg shadow overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="overflow-x-auto">
          <table
            className={`min-w-full divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
              <tr>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  ID
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Type
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Author
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Start Epoch
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  End Epoch
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Activation Epoch
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                darkMode
                  ? "bg-gray-800 divide-gray-700"
                  : "bg-white divide-gray-200"
              }`}
            >
              {data.Proposal.map((proposal: any, index: number) => (
                <tr
                  key={proposal.id}
                  className={
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }
                >
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {proposal.Type}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {proposal.Author}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {proposal.Start_Epoch}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {proposal.End_Epoch}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {proposal.Activation_Epoch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ValidatorTab = ({ data, loading, error, darkMode }: any) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`p-4 rounded-lg ${
          darkMode ? "bg-gray-800 text-red-400" : "bg-white text-red-600"
        }`}
      >
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div
        className={`rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header with Avatar */}
        <div
          className={`p-6 flex items-center space-x-4 ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <img
            src={data.Avatar}
            alt="ZecHub Logo"
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
          <div>
            <h1 className="text-2xl font-bold text-blue-400">{data.Name}</h1>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              {data.Description}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <h2
                className={`text-sm font-semibold uppercase tracking-wider ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Contact
              </h2>
              <p className="mt-2">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Email:
                </span>{" "}
                {data.Email}
              </p>
              <p className="mt-1">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Discord:
                </span>{" "}
                {data.Discord}
              </p>
              <p className="mt-1">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Website:
                </span>
                <a
                  href={data.Website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline ml-1"
                >
                  {data.Website}
                </a>
              </p>
            </div>

            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <h2
                className={`text-sm font-semibold uppercase tracking-wider ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Staking Details
              </h2>
              <p className="mt-2">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Commission:
                </span>{" "}
                {data.Commission}
              </p>
              <p className="mt-1">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Max Change:
                </span>{" "}
                {data.Max_Change}
              </p>
              <p className="mt-1">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Epoch:
                </span>{" "}
                {data.Epoch}
              </p>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <h2
              className={`text-sm font-semibold uppercase tracking-wider ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Address
            </h2>
            <p
              className={`mt-2 font-mono text-sm break-all p-3 rounded ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              {data.Address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceDashboard;
