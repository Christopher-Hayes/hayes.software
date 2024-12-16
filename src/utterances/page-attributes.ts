import repoRegex from './repo-regex';

// function readPageAttributes() {
//   const params = Object.fromEntries(new URL(location.href).searchParams)

//   let issueTerm: string | null = null;
//   let issueNumber: number | null = null;
//   if ('issue-term' in params) {
//     issueTerm = params['issue-term'];
//     if (issueTerm !== undefined) {
//       if (issueTerm === '') {
//         throw new Error('When issue-term is specified, it cannot be blank.');
//       }
//       if (['title', 'url', 'pathname', 'og:title'].indexOf(issueTerm) !== -1) {
//         if (!params[issueTerm]) {
//           throw new Error(`Unable to find "${issueTerm}" metadata.`);
//         }
//         issueTerm = params[issueTerm];
//       }
//     }
//   } else if ('issue-number' in params) {
//     issueNumber = +params['issue-number'];
//     if (issueNumber.toString(10) !== params['issue-number']) {
//       throw new Error(`issue-number is invalid. "${params['issue-number']}`);
//     }
//   } else {
//     throw new Error('"issue-term" or "issue-number" must be specified.');
//   }

//   if (!('repo' in params)) {
//     throw new Error('"repo" is required.');
//   }

//   if (!('origin' in params)) {
//     throw new Error('"origin" is required.');
//   }

//   const matches = repoRegex.exec(params.repo);
//   if (matches === null) {
//     throw new Error(`Invalid repo: "${params.repo}"`);
//   }

//   return {
//     owner: matches[1],
//     repo: matches[2],
//     issueTerm,
//     issueNumber,
//     origin: params.origin,
//     url: params.url,
//     title: params.title,
//     description: params.description,
//     label: params.label,
//     theme: params.theme || 'github-light',
//     session: params.session
//   };
// }

// TODO: Store this in some way
function readPageAttributes() {
  console.log('readPageAttributes');

  const url = new URL(location.href)
  const params = Object.fromEntries(url.searchParams)

  const REPO = 'Christopher-Hayes/hayes.software';
  const matches = repoRegex.exec(REPO);
  if (matches === null) {
    throw new Error(`Invalid repo: "${REPO}"`);
  }

  return {
    owner: matches[1],
    repo: matches[2],
    issueTerm: 'pathname',
    issueNumber: params['issue-number'] ? +params['issue-number'] : null,
    origin: url.origin,
    url: url.href,
    title: document.title,
    description: (document.querySelector('meta[name="description"]') as HTMLElement)?.innerText,
    label: params.label || 'comment',
    theme: params.theme || 'icy-dark',
    session: params.session
  }
}

export const pageAttributes = readPageAttributes();
