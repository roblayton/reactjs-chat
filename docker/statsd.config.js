{
//  graphitePort: 2003,
//  graphiteHost: "graphite.example.com",
  port: 8125,
//  backends: [ "./backends/graphite", "statsd-influxdb-backend" ],
  debug: process.env.STATSD_DEBUG || false,
  backends: [ "statsd-influxdb-backend" ],
  influxdb: {
    host: process.env.INFLUXDB_HOST || '127.0.0.1',   // InfluxDB host. (default 127.0.0.1)
    port: process.env.INFLUXDB_PORT || '8086',          // InfluxDB port. (default 8086)
    ssl: false,                                       // InfluxDB is hosted over SSL. (default false)
    database: process.env.INFLUXDB_DB || "statsd",    // InfluxDB database instance. (required)
    username: process.env.INFLUXDB_USER || "root",    // InfluxDB database username. (required)
    password: process.env.INFLUXDB_PASS || "root",    // InfluxDB database password. (required)
    flush: {
      enable: true       // Enable regular flush strategy. (default true)
    },
    proxy: {
      enable: false,       // Enable the proxy strategy. (default false)
      suffix: 'raw',       // Metric name suffix. (default 'raw')
      flushInterval: 1000  // Flush interval for the internal buffer.
                           // (default 1000)
    },
    includeStatsdMetrics: false, // Send internal statsd metrics to InfluxDB. (default false)
    includeInfluxdbMetrics: false // Send internal backend metrics to InfluxDB. (default false)
                                  // Requires includeStatsdMetrics to be enabled.
  }
}
