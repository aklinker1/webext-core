export function parseMatchPattern(matchPattern: string): MatchPattern {
  if (matchPattern === '<all_urls>') return new MatchPattern(MatchPattern.PROTOCOLS, '*', '*');

  const groups = /(.*):\/\/(.*?)(\/.*)/.exec(matchPattern);
  if (groups == null) throw new InvalidMatchPattern(matchPattern, 'Incorrect format');

  const [_, protocol, hostname, pathname] = groups;
  validateProtocol(matchPattern, protocol);
  validateHostname(matchPattern, hostname);
  validatePathname(matchPattern, pathname);

  const protocols = protocol === '*' ? ['http', 'https'] : [protocol];
  return new MatchPattern(protocols, hostname, pathname);
}

class MatchPattern {
  static PROTOCOLS = ['http', 'https', 'file', 'ftp', 'urn'];

  constructor(
    private protocolMatches: string[],
    private hostnameMatch: string | undefined,
    private pathnameMatch: string | undefined,
  ) {}

  /**
   * Check if a URL is included in a pattern.
   *
   * @example
   * const pattern = parseMatchPattern("*://google.com/*");
   *
   * pattern.includes("https://google.com");            // true
   * pattern.includes("http://youtube.com/watch?v=123") // false
   */
  includes(url: string | URL | Location): boolean {
    const u: URL =
      typeof url === 'string' ? new URL(url) : url instanceof Location ? new URL(url.href) : url;

    return !!this.protocolMatches.find(protocol => {
      if (protocol === 'http') return this.isHttpMatch(u);
      if (protocol === 'https') return this.isHttpsMatch(u);
      if (protocol === 'file') return this.isFileMatch(u);
      if (protocol === 'ftp') return this.isFtpMatch(u);
      if (protocol === 'urn') return this.isUrnMatch(u);
    });
  }

  private isHttpMatch(url: URL): boolean {
    return url.protocol === 'http:' && this.isHostPathMatch(url);
  }

  private isHttpsMatch(url: URL): boolean {
    return url.protocol === 'https:' && this.isHostPathMatch(url);
  }

  private isHostPathMatch(url: URL): boolean {
    if (!this.hostnameMatch || !this.pathnameMatch) return false;

    const hostnameMatchRegexs = [
      this.convertPatternToRegex(this.hostnameMatch),
      this.convertPatternToRegex(this.hostnameMatch.replace(/^\*\./, '')),
    ];
    const pathnameMatchRegex = this.convertPatternToRegex(this.pathnameMatch);
    return (
      !!hostnameMatchRegexs.find(regex => regex.test(url.hostname)) &&
      pathnameMatchRegex.test(url.pathname)
    );
  }

  private isFileMatch(url: URL): boolean {
    throw Error('Not implemented: file:// pattern matching. Open a PR to add support');
  }

  private isFtpMatch(url: URL): boolean {
    throw Error('Not implemented: ftp:// pattern matching. Open a PR to add support');
  }

  private isUrnMatch(url: URL): boolean {
    throw Error('Not implemented: urn:// pattern matching. Open a PR to add support');
  }

  private convertPatternToRegex(pattern: string): RegExp {
    const escaped = this.escapeForRegex(pattern);
    const starsReplaced = escaped.replace(/\\\*/g, '.*');
    return RegExp(`^${starsReplaced}$`);
  }

  private escapeForRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

export class InvalidMatchPattern extends Error {
  constructor(matchPattern: string, reason: string) {
    super(`Invalid match pattern "${matchPattern}": ${reason}`);
  }
}

function validateProtocol(matchPattern: string, protocol: string): void {
  if (!MatchPattern.PROTOCOLS.includes(protocol) && protocol !== '*')
    throw new InvalidMatchPattern(
      matchPattern,
      `${protocol} not a valid protocol (${MatchPattern.PROTOCOLS.join(', ')})`,
    );
}

function validateHostname(matchPattern: string, hostname: string): void {
  if (hostname.includes(':'))
    throw new InvalidMatchPattern(matchPattern, `Hostname cannot include a port`);

  if (hostname.includes('*') && hostname.length > 1 && !hostname.startsWith('*.'))
    throw new InvalidMatchPattern(
      matchPattern,
      `If using a wildcard (*), it must go at the start of the hostname`,
    );
}

function validatePathname(matchPattern: string, pathname: string): void {
  return;
}
