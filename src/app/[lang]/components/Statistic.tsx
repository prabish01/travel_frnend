interface Statistics {
  id: number;
  description: string;
  number: number;
}
interface StatisticsProps {
  data: {
    heading: string;
    description: string;
    statistics: Statistics[];
  };
}

export default function Statistic({ data }: StatisticsProps) {
  return (
    <div className="bg-teal-400 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{data.heading}</h2>
            <p className="mt-4 text-lg leading-8 text-center text-teal-100">{data.description}</p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {data.statistics.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-teal-300 p-8">
                <dt className="text-sm font-semibold leading-6 text-teal-100">{stat.description}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{stat.number}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
