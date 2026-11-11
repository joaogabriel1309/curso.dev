import useSWR from "swr";

async function fetcherAPI(key) {
  const response = await fetch(key);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export default function StatusPage() {
  const { isLoading, data, error } = useSWR("/api/v1/status", fetcherAPI, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error && !data) {
    return (
      <main>
        <h1>Status do sistema</h1>
        <p>Status: Indisponível</p>
        <p>Não foi possível consultar a API.</p>
      </main>
    );
  }

  return (
    <main>
      <UpdateAt updatedAt={data.updated_at} error={error} />
      <DatabaseStatus database={data.database} />
    </main>
  );
}

function UpdateAt({ updatedAt, error }) {
  return (
    <section>
      <h1>Status do sistema</h1>
      <p>Status: {error ? "Indisponível" : "Operacional"}</p>
      <p>Última atualização: {new Date(updatedAt).toLocaleString()}</p>
    </section>
  );
}

function DatabaseStatus({ database }) {
  return (
    <section>
      <h2>Banco de dados</h2>
      <p>Versão: {database.version}</p>
      <p>
        Conexões: {database.connections_used} de {database.maximum_connection}
      </p>
    </section>
  );
}
