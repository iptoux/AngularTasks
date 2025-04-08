import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import packageInfo from '../../../package.json';

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  // Add other fields you might need
}



@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private readonly githubApiUrl = 'https://api.github.com/repos/iptoux/AngularTasks/releases/latest';


  constructor(private http: HttpClient) { }

  /**
   * Returns the application version from package.json
   */
  getVersion(): string {
    return packageInfo.version;
  }

  /**
   * Fetches the latest version from GitHub
   */
  getLatestVersion(): Observable<string | null> {
    return this.http.get<GitHubRelease>(this.githubApiUrl).pipe(
      map((release: GitHubRelease) => {
        // GitHub releases typically use tags like 'v1.2.3', so we might need to remove the 'v' prefix
        return release.tag_name.startsWith('v') ?
          release.tag_name.substring(1) :
          release.tag_name;
      }),
      catchError(error => {
        console.error('Error fetching latest version from GitHub:', error);
        return of(null);
      })
    );
  }

  /**
   * Checks if a newer version is available on GitHub
   * @returns Observable with update info: { hasUpdate: boolean, currentVersion: string, latestVersion: string | null }
   */
  checkForUpdates(): Observable<{ hasUpdate: boolean, currentVersion: string, latestVersion: string | null }> {
    const currentVersion = this.getVersion();

    return this.getLatestVersion().pipe(
      map(latestVersion => {
        if (!latestVersion) {
          return { hasUpdate: false, currentVersion, latestVersion: null };
        }

        // Compare versions (you might want to use a library like 'semver' for more robust comparison)
        const hasUpdate = this.compareVersions(latestVersion, currentVersion) > 0;

        return {
          hasUpdate,
          currentVersion,
          latestVersion
        };
      })
    );
  }

  /**
   * Compares two version strings
   * @param v1 First version string (e.g., "1.2.3")
   * @param v2 Second version string (e.g., "1.2.0")
   * @returns 1 if v1 > v2, -1 if v1 < v2, 0 if equal
   */
  private compareVersions(v1: string, v2: string): number {
    const v1Parts = v1.split('.').map(Number);
    const v2Parts = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = v1Parts[i] || 0;
      const v2Part = v2Parts[i] || 0;

      if (v1Part > v2Part) return 1;
      if (v1Part < v2Part) return -1;
    }

    return 0;
  }


}
